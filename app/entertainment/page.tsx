import EntertainmentWall from "@/components/EntertainmentWall";
import { favoriteFilms, favoriteTracks } from "@/content/site";

export default function EntertainmentPage() {
  return <EntertainmentWall tracks={favoriteTracks} films={favoriteFilms} />;
}
