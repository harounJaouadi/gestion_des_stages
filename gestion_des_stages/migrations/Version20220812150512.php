<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220812150512 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intern DROP FOREIGN KEY FK_A5795F36166D1F9C');
        $this->addSql('ALTER TABLE intern ADD CONSTRAINT FK_A5795F36166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intern DROP FOREIGN KEY FK_A5795F36166D1F9C');
        $this->addSql('ALTER TABLE intern ADD CONSTRAINT FK_A5795F36166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
    }
}
