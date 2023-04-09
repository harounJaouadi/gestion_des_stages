<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\Supervisor;
use App\Repository\ProjectRepository;
use App\Repository\SupervisorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiSupervisorsController extends AbstractController
{
    private $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    #[Route('/api/supervisors', name: 'displaySupervisors', methods: ["Get"])]
    public function displaySupervisors(SupervisorRepository $supervisorRep): JsonResponse
    {
        try {
            $supervisors = $supervisorRep->findAll();
            return $this->json($supervisors, 200, [], ["groups" => "supervisor:read"]);
        } catch (Exception $exception) {
            return $this->json([
                "status" => "400",
                "message" => $exception->getMessage()
            ]);
        }
    }


    //must put the name of the project and the email of the supervisor 
    #[Route('/api/supervisors', name: 'addSupervisor', methods: ["POST"])]
    public function addSupervisor(
        Request $req,
        SupervisorRepository $supervisorRep,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ) {
        $content = $req->getContent();
         
        try {
            $supervisor = $serializer->deserialize($content, Supervisor::class, 'json');
           if ($supervisor->getEmail() && !($supervisorRep->findOneBy(['email' => $supervisor->getEmail()]))) {
                $errors = $validator->validate($supervisor);
                if (count($errors) > 0) {
                    return $this->json($errors, 400);
                }

                $this->em->persist($supervisor);
                $this->em->flush();

                return $this->json($supervisor, 201, [], ["groups" => "supervisor:read"]);
            } else {
                return $this->json(
                    [
                        "status"  => "304",
                        "message" => "supervisor already exist or email is not set "
                    ],
                    200
                );
            }
        } catch (Exception $exception) {
            return $this->json([
                "status" => 400,
                "message" => $exception->getMessage()
            ]);
        }
    }

    #[Route('/api/supervisors', name: 'modifySupervisor', methods: ["PATCH"])]
    public function modifySupervisor(
        Request $req,
        SupervisorRepository $supervisorRep,
        ProjectRepository $projectRep
    ) {
        $content = $req->getContent();

        try {
            $supervisorOb = json_decode($content);
            
            $supervisor = isset($supervisorOb->id) ? $supervisorRep->find($supervisorOb->id) : null;
            
            

            //email validity
            $emailValid=true ;
            if(isset($supervisorOb->email)){
                $email=$supervisorOb->email ; 
                $emailValid= $email[0]!='@' && strlen($email)>5 && str_contains($email,'.') && str_contains($email,'@') ;
            }
            //
            

            if ($supervisor && $emailValid) {
                isset($supervisorOb->email) && $supervisor->setEmail($supervisorOb->email);
                isset($supervisorOb->name) && $supervisor->setName($supervisorOb->name);
                isset($supervisorOb->phone) && $supervisor->setPhone($supervisorOb->phone);
                $this->em->flush();
                return $this->json($supervisor, 200, [], ["groups" => "supervisor:read"]);
            } else {

                return $this->json(
                    [
                        "status"  => "304",
                        "message" => "not modified"
                    ],
                    304
                );
            }
        } catch (Exception $exception) {

            return $this->json([
                "status" => 400,
                "message" => $exception->getMessage()
            ]);
        }
    }



    #[Route('/api/supervisors', name: 'removeSupervisor', methods: ["DELETE"])]
    public function removeSupervisor(Request $req, SupervisorRepository $supervisorRep)
    {
        $content = $req->getContent();
        try {

            if (isset(json_decode($content)->id) && $supervisorRep->find(json_decode($content)->id)) {
                $supervisor = $supervisorRep->find(json_decode($content)->id);
                if(count($supervisor->getProjects())!=0){
                    foreach($supervisor->getProjects() as $project){
                        $supervisor->removeProject($project) ; 
                    }

                }
                $this->em->remove($supervisor);
                $this->em->flush();
                return $this->json($supervisor, 201, [], ["groups" => "supervisor:read"]);
            } else {
                return $this->json([
                    "status" => 400,
                    "message" => "problem in the id "
                ]);
            }
        } catch (Exception $exception) {
            return $this->json([
                "status" => 400,
                "message" => $exception->getMessage()
            ]);
        }
    }
}
