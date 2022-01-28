<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220128221331 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE component (id INT AUTO_INCREMENT NOT NULL, plugin_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, data LONGTEXT NOT NULL, type VARCHAR(255) NOT NULL, order_id INT NOT NULL, INDEX IDX_49FEA157EC942BCF (plugin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE component_settings (id INT AUTO_INCREMENT NOT NULL, component_id INT NOT NULL, server_id INT NOT NULL, turned_on SMALLINT NOT NULL, data LONGTEXT NOT NULL, INDEX IDX_A7473428E2ABAFFF (component_id), INDEX IDX_A74734281844E6B7 (server_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE module (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, order_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE plugin (id INT AUTO_INCREMENT NOT NULL, module_id INT NOT NULL, name VARCHAR(255) NOT NULL, order_id INT NOT NULL, INDEX IDX_E96E2794AFC2B591 (module_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE plugin_settings (id INT AUTO_INCREMENT NOT NULL, plugin_id INT NOT NULL, server_id INT NOT NULL, turned_on SMALLINT NOT NULL, INDEX IDX_458DE02AEC942BCF (plugin_id), INDEX IDX_458DE02A1844E6B7 (server_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE component ADD CONSTRAINT FK_49FEA157EC942BCF FOREIGN KEY (plugin_id) REFERENCES plugin (id)');
        $this->addSql('ALTER TABLE component_settings ADD CONSTRAINT FK_A7473428E2ABAFFF FOREIGN KEY (component_id) REFERENCES component (id)');
        $this->addSql('ALTER TABLE component_settings ADD CONSTRAINT FK_A74734281844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
        $this->addSql('ALTER TABLE plugin ADD CONSTRAINT FK_E96E2794AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE plugin_settings ADD CONSTRAINT FK_458DE02AEC942BCF FOREIGN KEY (plugin_id) REFERENCES plugin (id)');
        $this->addSql('ALTER TABLE plugin_settings ADD CONSTRAINT FK_458DE02A1844E6B7 FOREIGN KEY (server_id) REFERENCES server (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE component_settings DROP FOREIGN KEY FK_A7473428E2ABAFFF');
        $this->addSql('ALTER TABLE plugin DROP FOREIGN KEY FK_E96E2794AFC2B591');
        $this->addSql('ALTER TABLE component DROP FOREIGN KEY FK_49FEA157EC942BCF');
        $this->addSql('ALTER TABLE plugin_settings DROP FOREIGN KEY FK_458DE02AEC942BCF');
        $this->addSql('DROP TABLE component');
        $this->addSql('DROP TABLE component_settings');
        $this->addSql('DROP TABLE module');
        $this->addSql('DROP TABLE plugin');
        $this->addSql('DROP TABLE plugin_settings');
    }
}
