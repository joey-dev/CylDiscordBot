<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220115160641 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE server ADD language_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE server ADD CONSTRAINT FK_5A6DD5F682F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id)');
        $this->addSql('CREATE INDEX IDX_5A6DD5F682F1BAF4 ON server (language_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE server DROP FOREIGN KEY FK_5A6DD5F682F1BAF4');
        $this->addSql('DROP INDEX IDX_5A6DD5F682F1BAF4 ON server');
        $this->addSql('ALTER TABLE server DROP language_id');
    }
}
