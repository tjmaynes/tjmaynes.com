# tjmaynes.com
> A blog dedicated to my ramblings, learnings and other things.

## Requirements

- [GNU Make](https://www.gnu.org/software/make/)
- [Zola](https://www.getzola.org/)

## Usage

To install project dependencies, run the following command:
```bash
make install
```

To build the website as an artifact for deployment, run the following command:
```bash
make artifact
```

To run the blog locally, run the following command:
```bash
make edit
``` 

To create a new blog post, run the following command:
```bash
POST_TITLE=<some title> make new_post
```

To convert mp4 (screen recordings) to gifs, run the following command:
```bash
VIDEO_INPUT=<some source mp4 file> make mp4_to_gif
```
