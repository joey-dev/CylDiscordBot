<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220129220309 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE component_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE component ADD type_id INT NOT NULL, DROP type');
        $this->addSql('ALTER TABLE component ADD CONSTRAINT FK_49FEA157C54C8C93 FOREIGN KEY (type_id) REFERENCES component_type (id)');
        $this->addSql('CREATE INDEX IDX_49FEA157C54C8C93 ON component (type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE component DROP FOREIGN KEY FK_49FEA157C54C8C93');
        $this->addSql('DROP TABLE component_type');
        $this->addSql('DROP INDEX IDX_49FEA157C54C8C93 ON component');
        $this->addSql('ALTER TABLE component ADD type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP type_id');
    }
}
