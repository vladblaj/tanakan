alter publication supabase_realtime add table "ChatsUsers";
ALTER TABLE "ChatsUsers" replica identity full;

alter publication supabase_realtime add table "Message";
ALTER TABLE "Message" replica identity full;

alter publication supabase_realtime add table "User";
ALTER TABLE "User" replica identity full;