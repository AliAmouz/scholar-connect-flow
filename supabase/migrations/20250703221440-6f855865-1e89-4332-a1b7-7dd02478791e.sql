
-- Disable email confirmation for faster testing
-- This allows users to sign up and be immediately authenticated without email verification
UPDATE auth.config 
SET email_confirm_required = false 
WHERE TRUE;

-- Also disable email change confirmation for smoother UX
UPDATE auth.config 
SET email_change_confirm_required = false 
WHERE TRUE;
