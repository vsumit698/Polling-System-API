# Polling-System-API
Created Polling System Api to create questions with options having votes feature

How to use--

1.  To create a question 

->  request(Post Request)
    http://localhost:8000/questions/create
    
    
->  Description
    which will create question with TITLE along contained options ARRAY

2.  To create a option for specific Question

    ->request(Post Request)
      http://localhost:8000/questions/:id/options/create

    ->Description
      which will create unique OPTION with TEXT, VOTES, LINK TO VOTE


3.  To delete a question 

     ->request(delete request)
       http://localhost:8000/questions/:id/delete
       
     ->Description
            which will delete QUESTION along with all OPTIONS

4. To view a question

   ->request(get request)
         http://localhost:8000/questions/:id
         
   ->response
        {
            "Question": {
                "options": [
                    {
                        "_id": "5e86028eae86476c1aaec8cf",
                        "text": "web development",
                        "votes": 2,
                        "question": "5e860270ae86476c1aaec8ce",
                        "__v": 0,
                        "link_to_vote": "http://localhost:8000/options/5e86028eae86476c1aaec8cf/add_vote"
                    }
                ],
                "_id": "5e860270ae86476c1aaec8ce",
                "title": "which is best coding ninjas course ?",
                "__v": 4
            }
        }
     
     
5.  To vote a option for specific Question

     ->request(get request)
       http://localhost:8000/options/:id/add_vote
       
     ->Description
            which will vote a OPTION for specific QUESTION
         
 
 
 6.  To delete a option
     ->request(get request)
       http://localhost:8000/options/:id/delete
       
     ->Description
            which will delete a OPTION for specific QUESTION
         
 
 
##Technologies
1-Backend ->Node.js
2-Database ->MongoDB
