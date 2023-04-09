<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220727173331 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intern ADD start_date DATETIME DEFAULT NULL, ADD end_date DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD duration INT DEFAULT NULL, DROP start_date, DROP end_date');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intern DROP start_date, DROP end_date');
        $this->addSql('ALTER TABLE project ADD start_date DATETIME NOT NULL, ADD end_date DATETIME NOT NULL, DROP duration');
    }
}
