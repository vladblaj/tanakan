DROP POLICY "insert_post" ON public.post;

CREATE POLICY "insert_post"
ON public.post
FOR INSERT 
WITH CHECK (
    requesting_user_id() = user_id
    );