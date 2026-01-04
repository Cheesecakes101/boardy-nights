import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  currentUser,
  mockRentals,
  mockEvents,
  mockPeoplePlayedWith,
  getGameById,
} from '@/data/mockData';
import {
  User,
  Mail,
  Phone,
  Home,
  Package,
  Calendar,
  Users,
  Shield,
  Edit,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  // Filter data for current user
  const userRentals = mockRentals.filter((r) => r.userId === currentUser.id);
  const completedRentals = userRentals.filter((r) => r.status === 'completed');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback className="text-2xl font-display">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
                  {currentUser.name}
                </h1>

                {currentUser.isVerified && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-status-available/10 px-3 py-1 text-sm font-medium text-status-available">
                    <Shield className="h-3 w-3" />
                    Verified
                  </span>
                )}

                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{currentUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Room {currentUser.roomNumber}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6 gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-4">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Your Stats 📊
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <Package className="h-5 w-5 mx-auto text-primary" />
                    <p className="mt-2 font-display text-2xl font-bold text-foreground">
                      {completedRentals.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Games Rented</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <Calendar className="h-5 w-5 mx-auto text-primary" />
                    <p className="mt-2 font-display text-2xl font-bold text-foreground">
                      7
                    </p>
                    <p className="text-xs text-muted-foreground">Events Attended</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <Users className="h-5 w-5 mx-auto text-primary" />
                    <p className="mt-2 font-display text-2xl font-bold text-foreground">
                      {mockPeoplePlayedWith.length}
                    </p>
                    <p className="text-xs text-muted-foreground">People Played With</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <span className="text-2xl">🏆</span>
                    <p className="mt-2 font-display text-2xl font-bold text-foreground">
                      12
                    </p>
                    <p className="text-xs text-muted-foreground">Games Won</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="rentals">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="rentals">Rental History</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
              </TabsList>

              {/* Rental History */}
              <TabsContent value="rentals" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4">
                      Rental History 📦
                    </h3>
                    {userRentals.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">🎲</div>
                        <p className="text-muted-foreground">No rentals yet</p>
                        <Link to="/games">
                          <Button className="mt-4">Browse Games</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userRentals.map((rental) => {
                          const game = getGameById(rental.gameId);
                          if (!game) return null;
                          return (
                            <div
                              key={rental.id}
                              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
                            >
                              <img
                                src={game.images[0]}
                                alt={game.name}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/games/${game.id}`}
                                  className="font-medium text-foreground hover:text-primary"
                                >
                                  {game.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                </p>
                              </div>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  rental.status === 'completed'
                                    ? 'bg-status-available/10 text-status-available'
                                    : rental.status === 'active'
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {rental.status.replace('_', ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Attended */}
              <TabsContent value="events" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4">
                      Events Attended 🎉
                    </h3>
                    <div className="space-y-4">
                      {mockEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-hero text-primary-foreground font-display font-bold">
                            {new Date(event.eventDate).getDate()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/events/${event.id}`}
                              className="font-medium text-foreground hover:text-primary"
                            >
                              {event.title}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {event.theme}
                            </p>
                          </div>
                          {event.status === 'completed' && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-status-available/10 text-status-available">
                              Attended
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* People Played With */}
              <TabsContent value="people" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4">
                      People You've Played With 👥
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      These are folks who attended the same events as you. Maybe reach out for a game night?
                    </p>
                    <div className="space-y-4">
                      {mockPeoplePlayedWith.map(({ user, gamesCount, lastPlayed }) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
                        >
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Room {user.roomNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-primary">
                              {gamesCount} games
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Last: {formatDate(lastPlayed)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
