<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use symfony\Component\Validator\Constraints as Assert ;


#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(["intern:read","supervisor:read","project:read"])]

    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["intern:read","supervisor:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(["intern:read","supervisor:read","project:read"])]
    #[Assert\NotBlank]
    private ?string $field = null;

 

    #[ORM\Column(nullable: false)]
    #[Groups(["intern:read","supervisor:read","project:read"])]
    #[Assert\NotBlank]
    private ?int $duration = null;

    #[ORM\Column]
    #[Groups(["project:read"])]
    #[Assert\NotBlank]
    private ?int $internNumber = null;

    #[ORM\OneToMany(mappedBy: 'Project', targetEntity: Intern::class)]
    #[Groups(["project:read"])]
    private Collection $interns;

    

    

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[Groups(["intern:read","project:read"])]
    private ?Supervisor $supervisor = null;

    

    public function __construct()
    {
        $this->interns = new ArrayCollection();
        
    }

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

    public function getField(): ?string
    {
        return $this->field;
    }

    public function setField(string $field): self
    {
        $this->field = $field;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getInternNumber(): ?int
    {
        return $this->internNumber;
    }

    public function setInternNumber(int $internNumber): self
    {
        $this->internNumber = $internNumber;

        return $this;
    }

    /**
     * @return Collection<int, Intern>
     */
    public function getInterns(): Collection
    {
        return $this->interns;
    }

    public function addIntern(Intern $intern): self
    {
        if (!$this->interns->contains($intern)) {
            $this->interns[] = $intern;
            $intern->setProject($this);
        }

        return $this;
    }

    public function removeIntern(Intern $intern ): self
    {
        if ($this->interns->removeElement($intern)) {
            // set the owning side to null (unless already changed)
            if ($intern->getProject() === $this) {
                //haroun add this statement 
                // $em->remove($intern);
                //removed by haroun
                $intern->setProject(null);
            }
        }

        return $this;
    }

    

 
    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getSupervisor(): ?Supervisor
    {
        return $this->supervisor;
    }

    public function setSupervisor(?Supervisor $supervisor): self
    {
        $this->supervisor = $supervisor;

        return $this;
    }
}
