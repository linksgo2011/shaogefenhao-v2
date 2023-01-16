folder=libs/email
fileName=book-review-request
imageHost=https://raw.githubusercontent.com/linksgo2011/shaogefenhao-v2/master/src/$folder
rm -rf build
mkdir build

cat src/${folder}/${fileName}.md > build/output.md
sed -i "" "s@./$fileName@$imageHost/$fileName@g" build/output.md
sed -i "" "s@src=$fileName\"@src=\"$imageHost/$fileName@g" build/output.md
pandoc -s build/output.md -w html --template=template/email_template.html -o build/email.html  --title-prefix email --highlight-style pygments

juice build/email.html build/email.html
