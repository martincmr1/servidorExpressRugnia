


class MessageRepository{
    constructor(messageAdapter){
        this.messageAdapter=messageAdapter
    }
    async sendMessage(messageInfo){
      await  this.messageAdapter.sendMessage(messageInfo)
    }
}


module.exports =MessageRepository