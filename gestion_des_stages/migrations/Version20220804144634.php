<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220804144634 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project ADD supervisor_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE19E9AC5F FOREIGN KEY (supervisor_id) REFERENCES supervisor (id)');
        $this->addSql('CREATE INDEX IDX_2FB3D0EE19E9AC5F ON project (supervisor_id)');
        $this->addSql('ALTER TABLE supervisor DROP FOREIGN KEY FK_4D9192F8166D1F9C');
        $this->addSql('DROP INDEX UNIQ_4D9192F8166D1F9C ON supervisor');
        $this->addSql('ALTER TABLE supervisor DROP project_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE19E9AC5F');
        $this->addSql('DROP INDEX IDX_2FB3D0EE19E9AC5F ON project');
        $this->addSql('ALTER TABLE project DROP supervisor_id');
        $this->addSql('ALTER TABLE supervisor ADD project_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE supervisor ADD CONSTRAINT FK_4D9192F8166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4D9192F8166D1F9C ON supervisor (project_id)');
    }
}
