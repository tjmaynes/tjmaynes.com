+++
title = "Using LaTeX"
date = 2014-11-21T12:00:00+01:00
author = "TJ Maynes"
description = "This blog post serves as a gentle introduction to LaTeX, the documentation preparation system and docmentation markup language."
draft = true
toc = false
images = [
  "https://source.unsplash.com/collection/983219/1600x900"
] # overrides site-wide open graph image
categories = [
  "personal"
]
tags = [
  "personal",
  "nyc"
]
[[copyright]]
  owner = "TJ Maynes"
  date = "2016"
  license = "MIT"
+++ 
*This blog post serves as a gentle introduction to LaTeX, the documentation preparation system and docmentation markup language.*

# Background
This semester I decided to write my reports from my Analysis of Algorithms class in LaTeX. This was not a difficult task to accomplish, it actually made writing these reports easier (and prettier). Before diving into installing LaTeX packages and setting up your first LaTeX document, let us begin by looking into the history of LaTeX.

# History behind LaTeX
[Tex](http://en.wikipedia.org/wiki/TeX) is a typesetting system written by [Donald Knuth](http://en.wikipedia.org/wiki/Donald_Knuth) in 1978 and is still used for typesetting complex math formulas today. LaTeX is written in TeX and, like Tex, was designed "to allow anybody to produce high-quality books using a reasonably minimal amount of effort, and to provide a system that would give exactly the same results on all computers, at any point in time".

LaTeX/TeX is still quite popular in academia in areas such as mathematics, sciences, and economics. You may have actually read a few books that were written in LaTeX (and you didn't even know). But, did you also know you can create beautiful resumes and CVs with LaTeX as well? Excited yet? Let's begin installing LaTeX on your machine!

# Installation
On Windows 7/8, download MiKTeX from [here](http://miktex.org/download).

On Mac OS X, download MacTeX from [here](https://tug.org/mactex/).

On *Nix System, just check your distribution's package manager for `xelatex`.

*If you have any issues installing LaTeX, just follow this [link](http://latex-project.org/ftp.html) for more download instructions.*

# Setting up your LaTeX file
This is an example from a report I wrote in my Analysis of Algorithms class. Remember that LaTeX can still be used for all kinds of documents (not just computer science reports).

{% highlight latex %}
% File: example.tex
% Author: TJ Maynes
% This is a comment!!
\documentclass[12pt]{article}
\RequirePackage{color,graphicx}
\usepackage{newcent}
\usepackage{multicol}
\usepackage{multirow}
\usepackage{cite}
\usepackage{url}
\usepackage{xltxtra,url,parskip}
\usepackage{xunicode}
\usepackage{float}
\usepackage[ruled,lined,linesnumbered,nofillcomment]{algorithm2e}
\usepackage[absolute]{textpos}
\usepackage[left=0.7in, right=0.7in, top=0.7in, bottom=0.7in]{geometry}
\usepackage[xetex,
  unicode,
  pdfencoding=auto,
  pdfinfo={
    Title={tjmaynes/Project1},
    Author={TJ Maynes},
    Subject={TJ Maynes Project1},
    Keywords={insertion sort, quick sort, merge sort, algorithms, undergraduate},
    Producer={xelatex},
    Creator{xelatex}}]{hyperref}
\defaultfontfeatures{Scale=MatchLowercase,Mapping=tex-text}
\defaultfontfeatures{Mapping=tex-text,Scale=MatchLowercase}
\restylefloat{table}
{% endhighlight %}

Above is a portion of code that serves as the "header" of your LaTeX document. The header of the page includes the documentclass, packages, specific fonts, etc. The "header" can be extended to include much more than this including custom layouts for various kinds of documents.

You can look [here](http://tex.stackexchange.com/questions/8750/make-your-own-sty-files) for more information on creating your own .sty files.

{% highlight latex %}
\begin{document}

\title{Asymptotic Notation and Sorting Project}
\author{TJ Maynes}
\date{October 15, 2014}

\maketitle

\textbf{1 Theory}

\vspace{0.2in}
\textbf{1.1 Insertion Sort}

Insertion sort is a sorting method that starts at a single element in an array and then increments the rest of the elements in an array. Pseudocode for implementing an insertion sort is provided in Algorithm 1.

\begin{algorithm}
  \For{$i=1$ to $n$}{

    $j=i$

    \While{$j > 0$ and {$A[j] < A[j-1]$}}{
      $\mathtt{Swap}(A[j], A[j-1])$

      $j-=1$
    }
  }
  \caption{\texttt{Insertionsort}($A,low,high$)}
\end{algorithm}

Below is a table of CPU times (in milliseconds) from running an increasing array of various instance sizes on mergesort. \\

\begin{table}[H]
  \begin{tabular}{lllllllllll}
    & \multicolumn{10}{c}{Mergesort}                                                               \\
    & \multicolumn{10}{c}{Instance Size}                                                           \\
    & 10000  & 20000  & 30000  & 40000  & 50000  & 60000   & 70000   & 80000   & 90000   & 100000  \\
    1   & 20.736 & 36.352 & 55.552 & 81.408 & 98.816 & 118.528 & 141.568 & 159.488 & 192.256 & 206.592 \\
    2   & 17.920 & 36.608 & 63.488 & 74.496 & 93.952 & 113.664 & 142.592 & 171.264 & 185.856 & 198.912 \\
    3   & 17.408 & 36.352 & 56.320 & 81.152 & 94.464 & 114.432 & 137.728 & 169.984 & 191.488 & 208.384 \\
    4   & 17.664 & 39.680 & 59.904 & 78.592 & 94.464 & 118.016 & 142.080 & 161.536 & 178.432 & 207.360 \\
    5   & 17.408 & 36.352 & 55.552 & 75.264 & 98.048 & 115.200 & 149.760 & 165.632 & 179.456 & 212.224 \\
    Avg & 18.227 & 37.069 & 58.163 & 78.182 & 95.949 & 115.968 & 142.746 & 165.581 & 185.498 & 206.694
  \end{tabular}
  \end{table}

% this is another comment!

\end{document}
{% endhighlight %}

Above is the portion of code that makes up the "body" of the LaTeX document. The body is where all the contents of your document are contained. In example below, I have included a Title, Author, and Date Tag (which is created by the \maketitle tag), an Algorithm function and an example table of CPU clock cycle times in Milliseconds.

Download full example LaTeX file [here](/public/example.tex)

# Compiling your LaTeX file
To compile your LaTeX file to pdf format, run the following command.
{% highlight bash %}
xelatex example.tex
{% endhighlight %}

*If you run into any issues on compilation, first read the compilation error and enter 'r' to finish compilations.*

You can also use an online LaTeX editor such as [WriteLaTeX.com](https://www.writelatex.com/).

# Conclusion
Many LaTeX concepts can be learned from the example file, however you can learn way more by just diving into LaTeX (which ultimately helped me the most). Also, I feel as though LaTeX has helped me better structure and think through my reports for class. I hope this post was of some use to you!

Please comment below with any questions or concerns. Thanks again!

*Extra: [Here](https://github.com/tjmaynes/career/blob/master/resume.tex) is an example of a LaTeX resume.*

# Free Templates
* [LaTeXTemplates](http://www.latextemplates.com/cat/curricula-vitae)
* [Overleaf](https://www.overleaf.com/latex/templates)
* [Rensselaer Career Development Center](http://www.rpi.edu/dept/arc/training/latex/resumes/)

# Sources
* [Emacs as the Ultimate LaTeX Editor](http://piotrkazmierczak.com/2010/05/13/emacs-as-the-ultimate-latex-editor/)
* [LaTeX - wiki](http://en.wikipedia.org/wiki/LaTeX)
* [TeX - wiki](http://en.wikipedia.org/wiki/TeX)
* [Reddit](http://www.reddit.com/r/latex)
* [StackExchange](http://tex.stackexchange.com/)
