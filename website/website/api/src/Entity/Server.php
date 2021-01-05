<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ServerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ServerRepository::class)
 */
class Server
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $serverId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="Servers")
     */
    private $User;

    /**
     * @ORM\ManyToMany(targetEntity=Command::class, inversedBy="Servers")
     */
    private $Commands;

    /**
     * @ORM\OneToMany(targetEntity=Roles::class, mappedBy="Server")
     */
    private $Roles;

    public function __construct()
    {
        $this->serverUsers = new ArrayCollection();
        $this->User = new ArrayCollection();
        $this->Commands = new ArrayCollection();
        $this->Roles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServerId(): ?string
    {
        return $this->serverId;
    }

    public function setServerId(string $serverId): self
    {
        $this->serverId = $serverId;

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

    /**
     * @return Collection|User[]
     */
    public function getUser(): Collection
    {
        return $this->User;
    }

    public function addUser(User $user): self
    {
        if (!$this->User->contains($user)) {
            $this->User[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->User->removeElement($user);

        return $this;
    }

    /**
     * @return Collection|Command[]
     */
    public function getCommands(): Collection
    {
        return $this->Commands;
    }

    public function addCommand(Command $Command): self
    {
        if (!$this->Commands->contains($Command)) {
            $this->Commands[] = $Command;
        }

        return $this;
    }

    public function removeCommand(Command $Command): self
    {
        $this->Commands->removeElement($Command);

        return $this;
    }

    /**
     * @return Collection|Roles[]
     */
    public function getRoles(): Collection
    {
        return $this->Roles;
    }

    public function addRole(Roles $role): self
    {
        if (!$this->Roles->contains($role)) {
            $this->Roles[] = $role;
            $role->setServer($this);
        }

        return $this;
    }

    public function removeRole(Roles $role): self
    {
        if ($this->Roles->removeElement($role)) {
            // set the owning side to null (unless already changed)
            if ($role->getServer() === $this) {
                $role->setServer(null);
            }
        }

        return $this;
    }
}
