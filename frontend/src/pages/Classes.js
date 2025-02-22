import { Link } from 'react-router-dom';

function ClassesPage() {
  return (
    <div>
      <h1>
        classes
      </h1>
      <Link to="/classes/cs240">
        cs240
      </Link>
    </div>
  )
}

export default ClassesPage;
