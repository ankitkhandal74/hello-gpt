echo "# new-gpt" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ankitkhandal74/new-gpt.git
git push -u origin main
npm run dev