import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, deleteUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center">
        <Card className="sm:w-100">
          <CardHeader className="text-center">
            <CardTitle>Profile</CardTitle>
            <CardDescription>This is you</CardDescription>
            <CardAction
              className="text-blue-400 cursor-pointer underline"
              onClick={() => navigate('/update-profile')}
            >
              Edit
            </CardAction>
          </CardHeader>
          <CardContent>
            <strong>Username: </strong>
            {user?.username}
          </CardContent>
          <CardContent>
            <strong>Email: </strong>
            {user?.email}
          </CardContent>
          <CardFooter>
            <Button onClick={() => logout()}>Logout</Button>
            <Button onClick={() => deleteUser()}>Delete</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
