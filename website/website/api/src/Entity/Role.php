<?php

namespace App\Entity;

use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Server::class, inversedBy: 'roles')]
    #[ORM\JoinColumn(nullable: false)]
    private $server;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    private $role_id;

    #[ORM\ManyToMany(targetEntity: Command::class, inversedBy: 'roles')]
    private $command;

    #[ORM\ManyToOne(targetEntity: Welcome::class, inversedBy: 'role')]
    private $welcome;

    public function __construct()
    {
        $this->command = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServer(): ?Server
    {
        return $this->server;
    }

    public function setServer(?Server $server): self
    {
        $this->server = $server;

        return $this;
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

    public function getRoleId(): ?string
    {
        return $this->role_id;
    }

    public function setRoleId(string $role_id): self
    {
        $this->role_id = $role_id;

        return $this;
    }

    /**
     * @return Collection|Command[]
     */
    public function getCommand(): Collection
    {
        return $this->command;
    }

    public function addCommand(Command $command): self
    {
        if (!$this->command->contains($command)) {
            $this->command[] = $command;
        }

        return $this;
    }

    public function removeCommand(Command $command): self
    {
        $this->command->removeElement($command);

        return $this;
    }

    public function getWelcome(): ?Welcome
    {
        return $this->welcome;
    }

    public function setWelcome(?Welcome $welcome): self
    {
        $this->welcome = $welcome;

        return $this;
    }
}
