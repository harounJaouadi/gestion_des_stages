<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InternRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use symfony\Component\Validator\Constraints as Assert ;

#[ORM\Entity(repositoryClass: InternRepository::class)]
class Intern
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(["intern:read","project:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["intern:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(["intern:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $email = null;


    #[ORM\Column(length: 255)]
    #[Groups(["intern:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["intern:read"])]
    private ?string $comments = null;

    #[ORM\ManyToOne(inversedBy: 'interns')]
    #[ORM\JoinColumn(nullable: false, onDelete:"CASCADE")]
    #[Groups(["intern:read"])]
    #[Assert\NotBlank]
    private ?Project $Project = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(["intern:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $startDate = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(["intern:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $endDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): self
    {
        $this->comments = $comments;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->Project;
    }

    public function setProject(?Project $Project): self
    {
        $this->Project = $Project;
        // //done by me 
        // $Project->addIntern($this) ;

        return $this;
    }

    public function getStartDate(): ?string
    {
        return $this->startDate;
    }

    public function setStartDate(?string $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?string
    {
        return $this->endDate;
    }

    public function setEndDate(?string $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }
}
