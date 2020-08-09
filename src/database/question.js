import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

const initializeDatabase = async () =>{

    const db = await sqlite.open("./ibdaa.db");


    /**
   * creates a question
   * @param {object} props an object with keys `question_title`,`question_type`, `question_data`
   * @returns {number} the id of the created question (or an error if things went wrong) 
   */
  

  const createQuestion = async (props) => {
    if(!props ){
      throw new Error(`you must provide a name and an type`)
    }
    

    //insert into user_question table 
    const { user_question_question ,user_question_answer,user_question_user } = props;

    try{
      const result = await db.run(SQL`INSERT INTO user_question (user_question_question,user_question_answer,user_question_user) VALUES (${user_question_question},${user_question_answer},${user_question_user})`);
      const id = result.stmt.lastID
      return id
    }catch(e){
      throw new Error(`couldn't insert this combination: `+e.message)
    }
  }


     /**
   * retrieves the questions from the database
   * @param {string} orderBy an optional string that is either "title_question"
   * @returns {array} the list of questions
   */

   const getQuestionList = async(orderBy) =>{
       try{
           let statement = `SELECT  * FROM questions `
           switch(orderBy){
            case 'question_data': statement+= ` ORDER BY question_data`; break;
            default: break
        }
        const rows = await db.all(statement)
      if(!rows.length){
        throw new Error(`no rows found`)
       }
       return rows
    }catch(e){
      throw new Error(`couldn't retrieve questions: `+e.message)
   }
   }
   ////////////////////////////////////////////////////////////////////



   const getAnswerList = async(orderBy) =>{
       try{
           let statement = `SELECT * FROM answers `
           switch(orderBy){
            case 'answer_text': statement+= ` ORDER BY answer_text`; break;
            default: break
        }
        const rows = await db.all(statement)
      if(!rows.length){
        throw new Error(`no rows found`)
       }
       return rows
    }catch(e){
      throw new Error(`couldn't retrieve answer: `+e.message)
   }
   }
   const createUserData = async (props) => {
    if(!props ){
      throw new Error(`you must provide a name and an type`)
    }
    

    //insert into user_question table 
    const { name } = props;

    try{
      const result = await db.run(SQL`INSERT INTO users (name) VALUES (${name})`);
      const id = result.stmt.lastID
      return id
    }catch(e){
      throw new Error(`couldn't insert this combination: `+e.message)
    }
  }


  const getUsersList = async(orderBy) =>{
    try{
        let statement = `SELECT * FROM users `
        switch(orderBy){
         case 'name': statement+= ` ORDER BY name`; break;
         default: break
     }
     const rows = await db.all(statement)
   if(!rows.length){
     throw new Error(`no rows found`)
    }
    return rows
 }catch(e){
   throw new Error(`couldn't retrieve answer: `+e.message)
}
}
  
   
const controller = {
    getQuestionList,
    createQuestion,
    getAnswerList,
    createUserData,
    getUsersList
  
}
return controller
}

export default initializeDatabase