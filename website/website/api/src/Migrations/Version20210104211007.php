<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210104211007 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE command_roles (command_id INT NOT NULL, roles_id INT NOT NULL, INDEX IDX_25967BF433E1689A (command_id), INDEX IDX_25967BF438C751C4 (roles_id), PRIMARY KEY(command_id, roles_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL, server_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL, INDEX IDX_B63E2EC71844E6B7 (server_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE command_roles ADD CONSTRAINT FK_25967BF433E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE command_roles ADD CONSTRAINT FK_25967BF438C751C4 FOREIGN KEY (roles_id) REFERENCES roles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE roles ADD CONSTRAINT FK_B63E2EC71844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE command_roles DROP FOREIGN KEY FK_25967BF438C751C4');
        $this->addSql('DROP TABLE command_roles');
        $this->addSql('DROP TABLE roles');
    }
}
