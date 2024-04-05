when the client sends a message --> an event should be thrown up like :
event name
{
message -->to be sent
{
    user socket id
    user id
},
{
    user socket id
    user id
}
}

check the ids to know which is the sender and reciever of the message.

broadcast the message to the reciver socket id 

and save he message to the db.

//the issue how does the frontend know the reciever socket id to be able to send it.