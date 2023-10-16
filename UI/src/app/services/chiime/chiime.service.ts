import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chiime } from 'src/app/models/Chiime';
import { Comment } from 'src/app/models/Comment';
import { CreateChiime } from 'src/app/models/CreateChiime';
import { CreateComment } from 'src/app/models/CreateComment';
import { Follow } from 'src/app/models/Follow';
import { Profile } from 'src/app/models/Profile';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChiimeService {
  baseUrl = environment.apiUrl + "chiime";
  constructor(private http: HttpClient) { }

  // done

createChiimePost(data: CreateChiime): Observable<Chiime>{
  return this.http.post<Chiime>(`${this.baseUrl}`, data);
}
//done
createComment(chiimeId: string | null,data: CreateComment): Observable<Comment>{
  return this.http.post<Comment>(`${this.baseUrl}/${chiimeId}/comment`, data,  {responseType: 'json'});
}

//done
followUser(userToFollow: string): Observable<string>{
  return this.http.post<string>(`${this.baseUrl}/follow/${userToFollow}`, userToFollow, {responseType: 'json'});
}
//done
getAllChiime(): Observable<Chiime[]>{
  return this.http.get<Chiime[]>(`${this.baseUrl}/all`);
}

//done
getProfile(userName: string): Observable<Profile>{
  return this.http.get<Profile>(`${this.baseUrl}/profile/${userName}`);
}
//done
getChiime(chiimeId: string): Observable<Chiime>{
  return this.http.get<Chiime>(`${this.baseUrl}/${chiimeId}`);
}
//needs logic updated
getFeed(): Observable<Chiime[]>{
  return this.http.get<Chiime[]>(`${this.baseUrl}/home`, {responseType: 'json'});
}
//done
deleteChiime(chiimeId: string): Observable<Chiime>{
  return this.http.delete<Chiime>(`${this.baseUrl}/${chiimeId}`);
}
//done
deleteComment(id: string): Observable<Comment>{
  return this.http.delete<Comment>(`${this.baseUrl}/comment/${id}`);
}
//done
unfollowUser(userToFollow: string): Observable<Follow>{
  return this.http.delete<Follow>(`${this.baseUrl}/follow/${userToFollow}`,{responseType: 'json'});
}


editChiime(chiimeId: string, model: any): Observable<Chiime>{
  return this.http.put<Chiime>(`${this.baseUrl}/${chiimeId}/edit`, model)
}



}
