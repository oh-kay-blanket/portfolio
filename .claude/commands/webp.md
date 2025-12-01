Convert all .jpg and .png images in img/projects/tall/ to .webp format with compression.

Use sips (built-in macOS tool) to convert images:
- Find all .jpg and .png files in img/projects/tall/
- Convert each to .webp format with 80% quality
- Keep original filenames but change extension to .webp
- Delete the original .jpg/.png files after successful conversion
- Show summary of converted files

Command to use:
```bash
for file in img/projects/tall/*.{jpg,png,JPG,PNG}; do
  if [ -f "$file" ]; then
    output="${file%.*}.webp"
    sips -s format webp -s formatOptions 80 "$file" --out "$output" && rm "$file"
    echo "Converted: $file -> $output"
  fi
done
```
