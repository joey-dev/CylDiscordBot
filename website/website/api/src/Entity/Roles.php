<?php

namespace App\Entity;

use App\Repository\RolesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RolesRepository::class)
 */
class Roles
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $roleId;

    /**
     * @ORM\ManyToOne(targetEntity=Server::class, inversedBy="roles")
     */
    private $Server;

    /**
     * @ORM\ManyToMany(targetEntity=Command::class, mappedBy="roles")
     */
    private $Commands;

    public function __construct()
    {
        $this->Commands = new ArrayCollection();
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

    public function getRoleId(): ?string
    {
        return $this->roleId;
    }

    public function setRoleId(string $roleId): self
    {
        $this->roleId = $roleId;

        return $this;
    }

    public function getServer(): ?Server
    {
        return $this->Server;
    }

    public function setServer(?Server $Server): self
    {
        $this->Server = $Server;

        return $this;
    }

    /**
     * @return Collection|Command[]
     */
    public function getCommands(): Collection
    {
        return $this->Commands;
    }

    public function addCommand(Command $command): self
    {
        if (!$this->Commands->contains($command)) {
            $this->Commands[] = $command;
            $command->addRole($this);
        }

        return $this;
    }

    public function removeCommand(Command $command): self
    {
        if ($this->Commands->removeElement($command)) {
            $command->removeRole($this);
        }

        return $this;
    }
}
