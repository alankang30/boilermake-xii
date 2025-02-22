import ClassPage from '../../components/ui/ClassPage.js'
import QuestionAnswerPage from '../../components/ui/QuestionPage.js'

function CS251Page() {
    return (
      <ClassPage classnumber="CS251">
        <QuestionAnswerPage question="What's 2+2" answer="4"/>
      </ClassPage>
    )
  }
  
  export default CS251Page;