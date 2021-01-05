<?php

namespace App\Repository;

use App\Entity\WelcomeMessages;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WelcomeMessages|null find($id, $lockMode = null, $lockVersion = null)
 * @method WelcomeMessages|null findOneBy(array $criteria, array $orderBy = null)
 * @method WelcomeMessages[]    findAll()
 * @method WelcomeMessages[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WelcomeMessagesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WelcomeMessages::class);
    }

    // /**
    //  * @return WelcomeMessages[] Returns an array of WelcomeMessages objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WelcomeMessages
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
