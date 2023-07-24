import { Link } from "react-router-dom"
import SearchForm from '../../components/Search/SearchForm'

export function Navigation() {
  return (
    <div>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <SearchForm />
    </div>
  )
}

