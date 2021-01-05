<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210104233534 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE command (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE command_roles (command_id INT NOT NULL, roles_id INT NOT NULL, INDEX IDX_25967BF433E1689A (command_id), INDEX IDX_25967BF438C751C4 (roles_id), PRIMARY KEY(command_id, roles_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL, server_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL, INDEX IDX_B63E2EC71844E6B7 (server_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE server (id INT AUTO_INCREMENT NOT NULL, server_id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE server_user (server_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_613A7A91844E6B7 (server_id), INDEX IDX_613A7A9A76ED395 (user_id), PRIMARY KEY(server_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE server_command (server_id INT NOT NULL, command_id INT NOT NULL, INDEX IDX_FCB4F1681844E6B7 (server_id), INDEX IDX_FCB4F16833E1689A (command_id), PRIMARY KEY(server_id, command_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, token VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE command_roles ADD CONSTRAINT FK_25967BF433E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE command_roles ADD CONSTRAINT FK_25967BF438C751C4 FOREIGN KEY (roles_id) REFERENCES roles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE roles ADD CONSTRAINT FK_B63E2EC71844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
        $this->addSql('ALTER TABLE server_user ADD CONSTRAINT FK_613A7A91844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE server_user ADD CONSTRAINT FK_613A7A9A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE server_command ADD CONSTRAINT FK_FCB4F1681844E6B7 FOREIGN KEY (server_id) REFERENCES server (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE server_command ADD CONSTRAINT FK_FCB4F16833E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE command_roles DROP FOREIGN KEY FK_25967BF433E1689A');
        $this->addSql('ALTER TABLE server_command DROP FOREIGN KEY FK_FCB4F16833E1689A');
        $this->addSql('ALTER TABLE command_roles DROP FOREIGN KEY FK_25967BF438C751C4');
        $this->addSql('ALTER TABLE roles DROP FOREIGN KEY FK_B63E2EC71844E6B7');
        $this->addSql('ALTER TABLE server_user DROP FOREIGN KEY FK_613A7A91844E6B7');
        $this->addSql('ALTER TABLE server_command DROP FOREIGN KEY FK_FCB4F1681844E6B7');
        $this->addSql('ALTER TABLE server_user DROP FOREIGN KEY FK_613A7A9A76ED395');
        $this->addSql('DROP TABLE command');
        $this->addSql('DROP TABLE command_roles');
        $this->addSql('DROP TABLE roles');
        $this->addSql('DROP TABLE server');
        $this->addSql('DROP TABLE server_user');
        $this->addSql('DROP TABLE server_command');
        $this->addSql('DROP TABLE user');
    }
}
