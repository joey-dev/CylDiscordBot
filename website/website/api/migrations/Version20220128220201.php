<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220128220201 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE command_server DROP FOREIGN KEY FK_E52E1CB533E1689A');
        $this->addSql('ALTER TABLE role_command DROP FOREIGN KEY FK_32074F2F33E1689A');
        $this->addSql('DROP TABLE command');
        $this->addSql('DROP TABLE command_server');
        $this->addSql('DROP TABLE role_command');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE command (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE command_server (command_id INT NOT NULL, server_id INT NOT NULL, INDEX IDX_E52E1CB533E1689A (command_id), INDEX IDX_E52E1CB51844E6B7 (server_id), PRIMARY KEY(command_id, server_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE role_command (role_id INT NOT NULL, command_id INT NOT NULL, INDEX IDX_32074F2FD60322AC (role_id), INDEX IDX_32074F2F33E1689A (command_id), PRIMARY KEY(role_id, command_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE command_server ADD CONSTRAINT FK_E52E1CB51844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE command_server ADD CONSTRAINT FK_E52E1CB533E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE role_command ADD CONSTRAINT FK_32074F2F33E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE role_command ADD CONSTRAINT FK_32074F2FD60322AC FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE');
    }
}
