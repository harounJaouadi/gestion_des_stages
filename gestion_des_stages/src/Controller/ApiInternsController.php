<?php

namespace App\Controller;

use App\Entity\Intern;
use App\Entity\Project;
use App\Repository\InternRepository;
use Doctrine\ORM\Mapping\Entity;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Normalizer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiInternsController extends AbstractController
{

    private $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/api/interns', name: 'displayInterns', methods: ["GET", "HEAD"])]
    public function displayInterns(InternRepository $internRep): ?JsonResponse
    {
        try {

            $interns = $internRep->findAll();
            return $this->json($interns, 200, [], ["groups" => "intern:read"]);
        } catch (Exception $exception) {
            return $this->json([
                "status" => "500",
                "message" => $exception->getMessage()
            ]);
        }
    }


    #[Route("/api/interns", name: 'addInterns', methods: ["POST"])]
    public function addIntern(

        Request $req,
        InternRepository $internRep,
        SerializerInterface $serializer,
        ProjectRepository $projectRep,
        ValidatorInterface $validator
    ) {
       
        $content = $req->getContent();
        try {
            
            $intern = $serializer->deserialize($content, Intern::class, 'json');
            
            if ($intern->getEmail() && !($internRep->findOneBy(['email' => $intern->getEmail()]))) {

                if(!$intern->getProject() || !$intern->getProject()->getName()){
                    
                    return $this->json(
                        [
                            "status"  => "400",
                            "message" => "you must specify the project name"
                        ],
                        400
                    );
                }

                $projectReceivedName = ($intern->getProject())->getName();
                $project = $projectRep->findOneBy(["name"=>$projectReceivedName]);
                $intern->setProject($project);
                $errors = $validator->validate($intern);
                if (count($errors) > 0) {
                    return $this->json($errors, 400);
                }
                ($this->em)->persist($intern);
                ($this->em)->flush();


                return $this->json($intern, 201, [], ["groups" => "intern:read"]);
            } else {
                return $this->json(
                    [
                        "status"  => "304",
                        "message" => "user already exist or problem in the email"
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

    // modify intern 

    #[Route("/api/interns", name: 'modifyInterns', methods: ["PATCH"])]
    public function modifyIntern(Request $req, InternRepository $internRep, ProjectRepository $projectRep)
    {

        $content = $req->getContent();
        try {
            $internOb = json_decode($content) ; 
            $intern = isset($internOb->id) ? $internRep->findOneBy(["id" => $internOb->id]) : null;
            
            $projectIsSet = false;
            $projectFound = true;
            
            if ($intern) {
                $projectIsSet = isset($internOb->project);
                if ($projectIsSet) {
                    $projectFound = isset(($internOb->project)->id) && ($projectRep->findOneBy(["id" => ($internOb->project)->id]) != null);
                }
            }

            if ($intern && $projectFound) {


                isset($internOb->email) && $intern->setEmail($internOb->email);
                isset($internOb->name) && $intern->setName($internOb->name);
                isset($internOb->phone) && $intern->setPhone($internOb->phone);
                isset($internOb->comments) && $intern->setComments($internOb->comments);
                isset($internOb->startDate) && $intern->setStartDate($internOb->startDate);
                isset($internOb->endDate) && $intern->setEndDate($internOb->endDate);
                if ($projectIsSet && $projectFound) {
                    $intern->setProject($projectRep->findOneBy(["id" => ($internOb->project)->id]));
                };


                $this->em->flush();
                return $this->json($intern, 200, [], ["groups" => "intern:read"]);
            } else {

                return $this->json(
                    [
                        "status"  => "304",
                        "message" => "internId or project does not exist "
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


    #[Route("/api/interns", name: "removeIntern", methods: ["DELETE"])]
    public function remove(Request $req, InternRepository $internRep)
    {
        $content = $req->getContent();
        try {
            $internOb = json_decode($content);
            if (isset($internOb->id)) {
                $intern = $internRep->find($internOb->id);

                $this->em->remove($intern);
                $this->em->flush();
                return  $this->json($intern, 200, [], ["groups" => "intern:read"]);
            } else {
                return $this->json(
                    [
                        "status"  => "304",
                        "message" => "intern does not exist or not mentioned"
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




    

    
}




        // $projectsNormalized=$normalizer->normalize($projects,null,["groups"=>"post:read"]) ; 
        // $json=json_encode($projectsNormalized) ; 
        // dd($json,$projects) ; 
        // dd($json) ;
        // $json=$serializerInterface->serialize($projects,'json',["groups"=>"post:read"]) ;
        
        // $response=new Response($json,200,[
        //     "Content-type"=>"application/json" 
        // ]) ; 
        // return $response ; 
        //or
        // $response=new JsonResponse($json,200,[],true) ; 
        // return $response ; 

        
        // return $this->json([
        //     'message' => 'Welcome to your new controller!',
        //     'path' => 'src/Controller/ApiPostController.php',
        // ]);

         // #[Route('api/post',name:"api_post_store",methods:["POST"])]
    // public function store(Request $request , SerializerInterface $serializer ,EntityManagerInterface $em){
    //     $content=$request->getContent() ; 
    //     $post=$serializer->deserialize($content ,Intern::class, 'json') ;
    //     $project=new Project() ;
    //     $post->setProject($project);
    //     $em->persist($project) ;
    //     $em->persist($post) ; 
    //     $em->flush() ;    
            
        
    //     dd($post) ;  

    // }