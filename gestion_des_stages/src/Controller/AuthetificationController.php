<?php

namespace App\Controller;

use App\Entity\Admin;
use App\Repository\AdminRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class AuthetificationController extends AbstractController

{
    private $em ; 
public function __construct(EntityManagerInterface $em)
{
    $this->em=$em ; 
}
    #[Route('/api/Agents', name: 'app_authetification',methods:["POST"])]
    public function register(Request $req,UserPasswordHasherInterface $passwordHasher,
    AdminRepository $adminRep ):Response
    {
       $content=$req->getContent() ;
        
       try{
            $adminOb=json_decode($content);

            $email=$adminOb->email  ;
            if($adminRep->findOneBy(["email"=>$email])){
                return $this->json([
                    "message"=>"user already exist",
                    "status" => 400
                ])   ;
            };
            
            $plainPassword=$adminOb->password ;
            $admin=new Admin() ; 
            $hashedPassword=$passwordHasher->hashPassword($admin,$plainPassword);
            $admin->setEmail($email) ; 
            $admin->setPassword($hashedPassword) ;
            $this->em->persist($admin) ; 
            $this->em->flush() ; 
            return $this->json($admin,200,[],["admin:read"]) ;


       }catch(Exception $exception){
            return $this->json([
                "message"=>"you must specify the email and the password ",
                "status" => 400
            ])   ;  
       }
    }
}
