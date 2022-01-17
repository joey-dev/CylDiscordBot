<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220115005558 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE command (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE command_server (command_id INT NOT NULL, server_id INT NOT NULL, INDEX IDX_E52E1CB533E1689A (command_id), INDEX IDX_E52E1CB51844E6B7 (server_id), PRIMARY KEY(command_id, server_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, server_id INT NOT NULL, welcome_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL, INDEX IDX_57698A6A1844E6B7 (server_id), INDEX IDX_57698A6AD109C490 (welcome_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role_command (role_id INT NOT NULL, command_id INT NOT NULL, INDEX IDX_32074F2FD60322AC (role_id), INDEX IDX_32074F2F33E1689A (command_id), PRIMARY KEY(role_id, command_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE server (id INT AUTO_INCREMENT NOT NULL, server_id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, command_prefix VARCHAR(10) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, token VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_server (user_id INT NOT NULL, server_id INT NOT NULL, INDEX IDX_3F3FCECBA76ED395 (user_id), INDEX IDX_3F3FCECB1844E6B7 (server_id), PRIMARY KEY(user_id, server_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE welcome (id INT AUTO_INCREMENT NOT NULL, server_id INT NOT NULL, enabled TINYINT(1) NOT NULL, channel_id VARCHAR(255) NOT NULL, message_data LONGTEXT DEFAULT NULL, elements LONGTEXT DEFAULT NULL, private_message_data LONGTEXT DEFAULT NULL, private_elements LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_37CB61B31844E6B7 (server_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE language (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, small_name VARCHAR(5) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE command_server ADD CONSTRAINT FK_E52E1CB533E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE command_server ADD CONSTRAINT FK_E52E1CB51844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE role ADD CONSTRAINT FK_57698A6A1844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
        $this->addSql('ALTER TABLE role ADD CONSTRAINT FK_57698A6AD109C490 FOREIGN KEY (welcome_id) REFERENCES welcome (id)');
        $this->addSql('ALTER TABLE role_command ADD CONSTRAINT FK_32074F2FD60322AC FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE role_command ADD CONSTRAINT FK_32074F2F33E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_server ADD CONSTRAINT FK_3F3FCECBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_server ADD CONSTRAINT FK_3F3FCECB1844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE welcome ADD CONSTRAINT FK_37CB61B31844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE command_server DROP FOREIGN KEY FK_E52E1CB533E1689A');
        $this->addSql('ALTER TABLE role_command DROP FOREIGN KEY FK_32074F2F33E1689A');
        $this->addSql('ALTER TABLE role_command DROP FOREIGN KEY FK_32074F2FD60322AC');
        $this->addSql('ALTER TABLE command_server DROP FOREIGN KEY FK_E52E1CB51844E6B7');
        $this->addSql('ALTER TABLE role DROP FOREIGN KEY FK_57698A6A1844E6B7');
        $this->addSql('ALTER TABLE user_server DROP FOREIGN KEY FK_3F3FCECB1844E6B7');
        $this->addSql('ALTER TABLE welcome DROP FOREIGN KEY FK_37CB61B31844E6B7');
        $this->addSql('ALTER TABLE user_server DROP FOREIGN KEY FK_3F3FCECBA76ED395');
        $this->addSql('ALTER TABLE role DROP FOREIGN KEY FK_57698A6AD109C490');
        $this->addSql('DROP TABLE command');
        $this->addSql('DROP TABLE command_server');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE role_command');
        $this->addSql('DROP TABLE server');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_server');
        $this->addSql('DROP TABLE welcome');
        $this->addSql('DROP TABLE language');
    }
}
