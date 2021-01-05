<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210105145151 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE welcome ADD discord_server_id VARCHAR(255) NOT NULL, CHANGE server_id server_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE welcome ADD CONSTRAINT FK_37CB61B31844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
        $this->addSql('ALTER TABLE welcome_roles ADD CONSTRAINT FK_8462676FD109C490 FOREIGN KEY (welcome_id) REFERENCES welcome (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE welcome_roles ADD CONSTRAINT FK_8462676F38C751C4 FOREIGN KEY (roles_id) REFERENCES roles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE welcome_messages ADD CONSTRAINT FK_4F0FFBEFD109C490 FOREIGN KEY (welcome_id) REFERENCES welcome (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE welcome DROP FOREIGN KEY FK_37CB61B31844E6B7');
        $this->addSql('ALTER TABLE welcome DROP discord_server_id, CHANGE server_id server_id VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE welcome_messages DROP FOREIGN KEY FK_4F0FFBEFD109C490');
        $this->addSql('ALTER TABLE welcome_roles DROP FOREIGN KEY FK_8462676FD109C490');
        $this->addSql('ALTER TABLE welcome_roles DROP FOREIGN KEY FK_8462676F38C751C4');
    }
}
