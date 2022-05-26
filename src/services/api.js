export default async function getQuestionsFromAPI(token) {
  try {
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await questions.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
