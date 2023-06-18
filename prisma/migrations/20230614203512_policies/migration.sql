CREATE
POLICY "select_post"
ON public.post
FOR
SELECT USING (
    requesting_user_id() = user_id
    );

CREATE
POLICY "insert_post"
ON public.post
FOR
SELECT USING (
    requesting_user_id() = user_id
    );