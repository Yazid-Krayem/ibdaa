import initializeDatabase from './database/question'



import app from './app'
const start = async () => {
  const controller = await initializeDatabase();

  app.get("/", (req, res, next) => res.send("ok"));




  // LIST
  app.get("/questions/list", async (req, res, next) => {
    try {
      const { order } = req.query;
      const questions = await controller.getQuestionList(order);
      res.json({ success: true, result: questions });
    } catch (e) {
      next(e);
    }
  });

//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////
//////////////////////////////////////


  // LIST answer
  app.get("/answers/list", async (req, res, next) => {
    try {
      const { order } = req.query;
      const answers = await controller.getAnswerList(order);
      res.json({ success: true, result: answers });
    } catch (e) {
      next(e);
    }
  });

  //All useres
  app.get("/users/list", async (req, res, next) => {
    try {
      const { order } = req.query;
      const answers = await controller.getUsersList(order);
      res.json({ success: true, result: answers });
    } catch (e) {
      next(e);
    }
  });


  app.post("/users/add", async (req, res, next) => {
    try {
      const { name } = req.query;
      const result = await controller.createUserData({ name });
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });
 


  // ERROR
  app.use((err, req, res, next) => {
    const message = err.message
    res.status(500).json({ success:false, message })
  })
  
  app.listen(3000, () => console.log("server listening on port 3000"));
};

start();