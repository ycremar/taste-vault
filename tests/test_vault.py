import copy
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import vault


class VaultTests(unittest.TestCase):
    def setUp(self):
        self.data = vault.load(vault.ROOT / 'examples/writing/complete-vault')

    def test_complete_example_and_export(self):
        vault.validate(self.data)
        output = vault.context(vault.ROOT / 'examples/writing/complete-vault', 'Music lesson')
        self.assertIn('Music lesson', output)
        self.assertIn('UNTRUSTED_VAULT_DATA', output)
        self.assertIn('RULE001', output)

    def test_silence_is_not_rejection(self):
        vault.validate(self.data)
        self.assertEqual(self.data['feedback'][1]['disliked'], [])

    def test_invalid_vote_and_domain(self):
        for mutate in [lambda d: d['feedback'][0]['liked'].append('missing'),
                       lambda d: d['rounds'][0].update(domain='research')]:
            data = copy.deepcopy(self.data)
            mutate(data)
            with self.assertRaises(ValueError): vault.validate(data)

    def test_unobserved_external_source(self):
        self.data['rounds'][0]['candidates'][0]['source'] = {
            'kind': 'external', 'url': 'https://example.org', 'observed': False, 'rights': 'Link only'}
        with self.assertRaises(ValueError): vault.validate(self.data)

    def test_rule_needs_explicit_approval(self):
        self.data['feedback'][1]['approved_rules'] = []
        with self.assertRaises(ValueError): vault.validate(self.data)

    def test_correction_invalidates_stale_rule(self):
        correction = dict(self.data['feedback'][0], id='F003', supersedes='F001')
        self.data['feedback'].append(correction)
        with self.assertRaisesRegex(ValueError, 'superseded'): vault.validate(self.data)
        self.data['rubric'][0]['status'] = 'retired'
        self.assertEqual(vault.validate(self.data), {'F001'})

    def test_correction_cycle_rejected(self):
        self.data['feedback'][0]['supersedes'] = 'F003'
        self.data['feedback'].append(dict(self.data['feedback'][0], id='F003', supersedes='F001'))
        with self.assertRaises(ValueError): vault.validate(self.data)

    def test_append_only_and_path_safety(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'me'
            vault.initialize(path, 'writing')
            vault.add(path, 'rounds', self.data['rounds'][0])
            before = (path / 'rounds/R001.json').read_bytes()
            with self.assertRaises(ValueError): vault.add(path, 'rounds', self.data['rounds'][0])
            with self.assertRaises(FileExistsError): vault.initialize(path, 'writing')
            bad = dict(self.data['rounds'][0], id='../outside')
            with self.assertRaises(ValueError): vault.add(path, 'rounds', bad)
            self.assertEqual(before, (path / 'rounds/R001.json').read_bytes())


if __name__ == '__main__': unittest.main()
