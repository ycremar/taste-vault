CREATE TABLE `vault_events` (
	`id` text NOT NULL,
	`revision` integer NOT NULL,
	`payload` text NOT NULL,
	`saved_at` text NOT NULL,
	PRIMARY KEY(`id`, `revision`)
);
