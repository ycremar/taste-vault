#!/usr/bin/env python3
"""Export a validated file vault into the cloud library's import format."""
import argparse,json
import vault

def convert(path):
 data=vault.load(path);superseded=vault.validate(data)
 active=[f for f in data['feedback'] if f['id'] not in superseded]
 records=[]; by_feedback={}
 def base(id,kind,title,content):
  return dict(id=id,revision=0,kind=kind,title=title,domain=data['profile']['domain'],content=content,source='',image='',reaction='unreviewed',notes='',scope='',evidence=[],counterevidence=[],status='tentative')
 for round in data['rounds']:
  for candidate in round['candidates']:
   id=round['id']+'-'+candidate['id'];r=base(id,'selection',candidate['title'],candidate['content'])
   r['source']=candidate['source'].get('url','')
   votes=set();notes=['Round context: '+round['context'],'Provenance: '+json.dumps(candidate['source'],ensure_ascii=False)]
   for f in active:
    if f['round_id']!=round['id']:continue
    notes.append(f["id"]+' — exact round feedback: '+f['verbatim'])
    if candidate['id'] in f['liked']:votes.add('like');by_feedback.setdefault(f['id'],[]).append(id)
    if candidate['id'] in f['disliked']:votes.add('dislike');by_feedback.setdefault(f['id'],[]).append(id)
    for partial in f.get('partial_reactions',[]):
     if partial['candidate_id']==candidate['id']:notes.append('Partial reaction: '+partial['note'])
   r['reaction']='mixed' if len(votes)>1 else next(iter(votes),'unreviewed');r['notes']='\n\n'.join(notes);records.append(r)
 def refs(feedback_ids):
  return sorted({id for f in feedback_ids for id in by_feedback.get(f,[])})
 for h in data['hypotheses']:
  r=base('hyp-'+h['id'],'interpretation',h['claim'][:90],h['claim']);r.update(scope=h['scope'],evidence=refs(h['support']),counterevidence=refs(h['counterevidence']),notes='File-vault hypothesis (review in context):\n'+json.dumps(h,ensure_ascii=False,indent=2));records.append(r)
 for rule in data['rubric']:
  r=base('rule-'+rule['id'],'rubric',rule['rule'][:90],rule['rule']);r.update(status='retired' if rule['status']=='retired' else 'proposed',scope=rule['scope'],evidence=refs(rule['positive_evidence']),counterevidence=refs(rule['counterevidence']),notes='Imported rule; approval is not transferred automatically.\n'+json.dumps(rule,ensure_ascii=False,indent=2));records.append(r)
 return dict(schema='taste-library/v1',records=records,source_vault=data)

if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('vault');args=parser.parse_args()
 print(json.dumps(convert(args.vault),ensure_ascii=False,indent=2))
