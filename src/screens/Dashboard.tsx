import Navbar from "../components/Navbar"
import Transaction from "../components/Transaction"
import SideIcons from "../components/SideIcons"
import Overview from "../components/Overview/Overview"

const Dashboard = () => {
    return (
        <div className="p-6">
            <Navbar />
            <Overview />
            <Transaction />
            <SideIcons />
        </div>
    )
}

export default Dashboard;