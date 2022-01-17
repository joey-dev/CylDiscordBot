<?php

namespace App\Entity;

use App\Repository\ServerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServerRepository::class)]
class Server
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $server_id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'string', length: 10)]
    private $command_prefix;

    #[ORM\ManyToMany(targetEntity: Command::class, mappedBy: 'server')]
    private $commands;

    #[ORM\OneToMany(mappedBy: 'server', targetEntity: Role::class, orphanRemoval: true)]
    private $roles;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'server')]
    private $users;

    #[ORM\OneToOne(mappedBy: 'server', targetEntity: Welcome::class, cascade: ['persist', 'remove'])]
    private $welcome;

    #[ORM\ManyToOne(targetEntity: Language::class, inversedBy: 'servers')]
    #[ORM\JoinColumn(nullable: true)]
    private $language;

    public function __construct()
    {
        $this->commands = new ArrayCollection();
        $this->roles = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServerId(): ?string
    {
        return $this->server_id;
    }

    public function setServerId(string $server_id): self
    {
        $this->server_id = $server_id;

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

    public function getCommandPrefix(): ?string
    {
        return $this->command_prefix;
    }

    public function setCommandPrefix(string $command_prefix): self
    {
        $this->command_prefix = $command_prefix;

        return $this;
    }

    /**
     * @return Collection|Command[]
     */
    public function getCommands(): Collection
    {
        return $this->commands;
    }

    public function addCommand(Command $command): self
    {
        if (!$this->commands->contains($command)) {
            $this->commands[] = $command;
            $command->addServer($this);
        }

        return $this;
    }

    public function removeCommand(Command $command): self
    {
        if ($this->commands->removeElement($command)) {
            $command->removeServer($this);
        }

        return $this;
    }

    /**
     * @return Collection|Role[]
     */
    public function getRoles(): Collection
    {
        return $this->roles;
    }

    public function addRole(Role $role): self
    {
        if (!$this->roles->contains($role)) {
            $this->roles[] = $role;
            $role->setServer($this);
        }

        return $this;
    }

    public function removeRole(Role $role): self
    {
        if ($this->roles->removeElement($role)) {
            // set the owning side to null (unless already changed)
            if ($role->getServer() === $this) {
                $role->setServer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addServer($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeServer($this);
        }

        return $this;
    }

    public function getWelcome(): ?Welcome
    {
        return $this->welcome;
    }

    public function setWelcome(Welcome $welcome): self
    {
        // set the owning side of the relation if necessary
        if ($welcome->getServer() !== $this) {
            $welcome->setServer($this);
        }

        $this->welcome = $welcome;

        return $this;
    }

    public function getLanguage(): ?Language
    {
        return $this->language;
    }

    public function setLanguage(?Language $language): self
    {
        $this->language = $language;

        return $this;
    }
}
