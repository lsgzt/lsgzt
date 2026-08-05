"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";
import { LiquidGlassCard } from "@/components/illustrations/liquid-glass-card";

// Helper components for story formatting
function StorySection({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn className="mt-10">
      {heading && (
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {heading}
        </h3>
      )}
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </FadeIn>
  );
}

function Q({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-primary/40 pl-4 text-base italic text-foreground/80">
      {children}
    </blockquote>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Story"
          title="It started with a phone."
          description="I didn't begin with a computer science roadmap, a powerful development setup, or even a clear idea of what I wanted to build."
        />

        {/* Liquid glass card */}
        <FadeIn className="mt-12 flex justify-center">
          <div className="w-full max-w-sm">
            <LiquidGlassCard />
          </div>
        </FadeIn>

        {/* Story content */}
        <div className="mt-12">
          <StorySection>
            <p>
              I started by making small static HTML websites and hosting them from my phone. Seeing something I'd made become accessible on the internet for the first time was enough to make me curious:
            </p>
            <p className="font-medium text-foreground">What else could I build?</p>
            <p>That curiosity eventually led me to Python.</p>
            <p>
              I didn't know the whole language—and I still wasn't writing everything from scratch. I used AI heavily, understood enough of the code to experiment with it, broke things constantly, and gradually learned by trying to make ideas actually work.
            </p>
            <p>And that's where things started getting interesting.</p>
          </StorySection>

          <StorySection heading="Doing it all from a phone">
            <p>
              There was another part of this that shaped almost everything I built afterwards:{" "}
              <strong className="text-foreground">I was doing it all from my phone.</strong>
            </p>
            <p>
              And it wasn't some unusually powerful phone either. I was using an{" "}
              <strong className="text-foreground">OPPO A15</strong>, a fairly average Android phone.
            </p>
            <p>
              I just didn't want to give myself the excuse that I needed a laptop before I could start coding or making projects.
            </p>
            <p>So whenever my phone couldn't do something, I looked for a workaround:</p>
            <ul className="ml-4 space-y-2 border-l border-border pl-4">
              <li>For simple scripts, I used <strong className="text-foreground">Termux</strong>.</li>
              <li>For things that needed a GPU, I used <strong className="text-foreground">Google Colab</strong> or <strong className="text-foreground">Kaggle</strong>.</li>
              <li>If I couldn't comfortably manage and run a modern web project locally, I used <strong className="text-foreground">AI agents</strong> that had their own computers.</li>
              <li>Later, when I started working on Android apps and couldn't use Android Studio on my phone, I used <strong className="text-foreground">GitHub Actions</strong> to compile the APK remotely.</li>
            </ul>
            <p>I didn't have the ideal development environment.</p>
            <p>So I slowly built my own development environment out of whatever was available on the internet.</p>
          </StorySection>

          <StorySection heading="My first real AI project">
            <p>
              I discovered APIs, then found <strong className="text-foreground">Groq</strong>, and decided to build a chatbot.
            </p>
            <p>Getting an AI response was surprisingly easy.</p>
            <p>Getting an AI assistant that actually remembered the conversation wasn't.</p>
            <p>
              Every message behaved like a completely new conversation. While trying to fix it, I learned something that seems obvious to me now: the API wasn't responsible for remembering everything.{" "}
              <strong className="text-foreground">I had to build the memory layer myself.</strong>
            </p>
            <p className="italic">It was one of the first times a bug taught me more than a tutorial could.</p>
            <p>Eventually the chatbot worked.</p>
            <p>Naturally, my next thought was:</p>
            <p className="font-medium text-foreground">Can I put this on Telegram?</p>
            <p>
              That sent me down another rabbit hole—Telegram's Bot API, hosting platforms, PythonAnywhere, webhooks, system prompts and increasingly complicated bot logic.
            </p>
            <p>
              Some of those early experiments also explored persona design and generative-image workflows. They weren't all products worth keeping, but they taught me how separate AI services could be connected into one experience.
            </p>
          </StorySection>

          <StorySection heading="Then I found a problem actually worth solving.">
            <p>
              My father runs a shop where one of the things he does is prepare and print passport-size photographs.
            </p>
            <p>He used an AI tool to improve faces in photos.</p>
            <p>Then it became paid.</p>
            <p>So I thought:</p>
            <p className="font-medium text-foreground">Why don't I build our own?</p>
            <p>That question became one of the most important projects I've made.</p>
            <p>
              I found <strong className="text-foreground">CodeFormer</strong> and started experimenting with image-restoration APIs. But simply enhancing an image wasn't enough.
            </p>
            <p>I wanted to automate more of the workflow.</p>
            <p>
              So I built a Telegram bot that could take an uploaded photograph and process it through a pipeline:
            </p>
            <p className="font-mono text-sm text-foreground/80">
              Upload → Enhance → Remove background → Make it white → Generate a print-ready sheet of passport photos
            </p>
            <p>The interesting part was how I built it.</p>
            <p>
              Different pieces were generated and debugged with different AI systems. I worked on each part separately and eventually connected everything into a single working pipeline.
            </p>
            <p className="font-medium text-foreground">And it worked.</p>
            <p>My father actually used it.</p>
          </StorySection>

          <StorySection heading="Then the API credits ran out.">
            <p>That could have been the end of it.</p>
            <p>Instead, I started looking for another way.</p>
            <p>
              I discovered that the model had a Hugging Face Space that, at the time, could be used freely. Getting my own program to reliably interact with it became an unexpectedly difficult problem.
            </p>
            <p>
              It took weeks of experimenting with AI-generated code, debugging and trying different approaches before I finally had a working solution.
            </p>
            <p>
              And suddenly I had something I'd originally built for one person that could process images without the API limitation I'd started with.
            </p>
            <p>Then something unexpected happened.</p>
            <p>Other people found the Telegram bot.</p>
            <p className="text-foreground">No advertising.</p>
            <p className="text-foreground">No subscription.</p>
            <p className="text-foreground">No launch campaign.</p>
            <p>
              According to my bot's usage data, it eventually reached{" "}
              <strong className="text-foreground">1000+ users</strong> outside my father's use.
            </p>
            <p className="italic">That was probably the first time one of my experiments stopped feeling like an experiment.</p>
          </StorySection>

          <StorySection heading="From a bot to a product">
            <p>Eventually I wondered:</p>
            <p className="font-medium text-foreground">Why should this only exist inside Telegram?</p>
            <p>
              I used <strong className="text-foreground">Manus AI</strong> to help create a web version and continued developing it from there.
            </p>
            <p>That became the image enhancer I maintain today.</p>
            <p>It's free, publicly accessible, and still being used by real people.</p>
            <p>What started as:</p>
            <Q>"Dad's photo enhancer became paid."</Q>
            <p>eventually became:</p>
            <Q>A tool used by people I'd never met.</Q>
            <p className="italic">That's probably the best explanation of why I like building things.</p>
          </StorySection>

          <StorySection heading="Then I kept experimenting.">
            <p>Not everything needed to become a startup.</p>
            <p>Sometimes I built things simply because the technology sounded fun.</p>
            <p>
              After discovering AI voice conversion through YouTube, I started experimenting in Google Colab with converting voices and generating songs using my own and my friends' voices.
            </p>
            <p>It wasn't particularly useful.</p>
            <p className="font-medium text-foreground">It was extremely fun.</p>
            <p>And it introduced me to another completely different area of AI.</p>
          </StorySection>

          <StorySection heading="Could I train an AI to behave like me?">
            <p>Eventually another question appeared:</p>
            <p className="font-medium text-foreground">Could I create a model that reflected my own personality?</p>
            <p>
              I started learning about model training, choosing a base model, preparing conversational data and concepts such as epochs and training loss.
            </p>
            <p>
              For the dataset, I collected examples from my own conversations and experimented with training a model around those communication patterns.
            </p>
            <p>
              The final result worked well enough that I published the model on my{" "}
              <strong className="text-foreground">Hugging Face</strong> account.
            </p>
            <p>It wasn't something I needed.</p>
            <p className="italic">I built it because I wanted to know whether I could.</p>
            <p>And that describes quite a few things I've made.</p>
          </StorySection>

          <StorySection heading="StreamPoint happened because typing with a TV remote sucks.">
            <p>
              After we got a smart set-top box, I ran into an incredibly ordinary problem.
            </p>
            <p>
              I had found various websites for discovering movies and anime, but repeatedly typing URLs with a television remote was miserable.
            </p>
            <p>So instead of continuing to type them...</p>
            <p className="font-medium text-foreground">I made StreamPoint.</p>
            <p>A simple website that organized the destinations I wanted into one place.</p>
            <p className="font-mono text-sm text-foreground/80">
              Open StreamPoint → choose where I want to go → done.
            </p>
            <p>
              I shared it with friends who watch movies and anime, and they started using it too.
            </p>
            <p>Later, one of them casually told me:</p>
            <Q>"I watch movies through StreamPoint."</Q>
            <p className="italic">That tiny sentence meant more to me than a page-view counter.</p>
            <p>He didn't call it "that website you made."</p>
            <p>He called it by its name.</p>
            <p className="font-medium text-foreground">It had become a product in someone else's mind.</p>
          </StorySection>

          <StorySection heading="Then I tried to fix one of my own biggest problems.">
            <p>
              By this point, AI had made it possible for me to build things that would have been far beyond my coding knowledge otherwise.
            </p>
            <p>But developing from a phone still had an annoying workflow.</p>
            <p>
              I could ask an AI to generate some code, but then I'd have to copy it, move to an editor, paste it, test it, return to the AI, explain what happened, get another version and repeat.
            </p>
            <p>There were plenty of code editors for Android.</p>
            <p>There were plenty of AI coding tools.</p>
            <p>
              But I couldn't find an Android code editor that had the kind of deep AI integration I wanted—especially smart inline suggestions and the ability to actually write and work with code directly inside the editor.
            </p>
            <p>So eventually I thought:</p>
            <p className="font-medium text-foreground">Why don't I build that too?</p>
            <p>That became <strong className="text-foreground">PocketDev</strong>.</p>
          </StorySection>

          <StorySection heading="PocketDev">
            <p>
              <strong className="text-foreground">PocketDev</strong> is an AI-powered code editor for Android built around the way I wished I could code on my phone.
            </p>
            <p>
              Instead of having AI as a separate chatbot that happens to know programming, I wanted it integrated directly into the editor.
            </p>
            <p>So PocketDev gradually gained things like:</p>
            <ul className="ml-4 space-y-1.5 border-l border-border pl-4">
              <li>smart next-line AI suggestions,</li>
              <li>writing code with AI,</li>
              <li>finding bugs with AI,</li>
              <li>explaining code,</li>
              <li>automatic debugging,</li>
              <li>and a system that could attempt to fix code, run it again, inspect what went wrong and continue trying until it ran successfully.</li>
            </ul>
            <p>One of my favorite parts became the autocomplete interaction.</p>
            <p>
              When PocketDev shows a suggestion, I can{" "}
              <strong className="text-foreground">swipe right to accept it.</strong>
            </p>
            <p>If I simply continue typing, the suggestion disappears.</p>
            <p>
              And for multiline suggestions, I can partially swipe to accept only one line and continue from there.
            </p>
            <p>I can't claim that interaction as an original idea.</p>
            <p>
              I first saw something similar while writing an email in{" "}
              <strong className="text-foreground">Gmail</strong>. It predicted the rest of a sentence and told me to swipe right to accept it.
            </p>
            <p>I liked the interaction so much that I thought:</p>
            <p className="italic">Why shouldn't code completion work like that on a phone?</p>
            <p>So I adapted the idea for PocketDev.</p>
            <p className="italic">
              I think being honest about where an idea came from is much more interesting than pretending I invented everything myself.
            </p>
          </StorySection>

          <StorySection heading="PocketDev also showed me the limits of the way I build.">
            <p className="font-medium text-foreground">PocketDev works.</p>
            <p>But it's not perfect.</p>
            <p>
              Larger files can still cause performance problems. The editor itself needs optimization. The way project files and context are provided to AI could be much better.
            </p>
            <p>
              I've considered using an open-source editor such as <strong className="text-foreground">Sora Editor</strong>, but integrating it into what I'd already built while preserving the AI features and autocomplete turned out to be much harder than simply replacing one component.
            </p>
            <p>
              My current implementation is closer to a heavily extended text editor than the Android equivalent of a full desktop IDE.
            </p>
            <p>
              And ironically, improving it is made harder by the exact problem PocketDev is trying to solve:
            </p>
            <p className="font-medium text-foreground">
              I'm developing an Android development tool from an Android phone.
            </p>
            <p>I can't open Android Studio, modify something and immediately look at the result.</p>
            <p>Sometimes I know exactly what tiny change I want.</p>
            <p>Maybe I just want:</p>
            <p className="font-mono text-sm text-foreground/80">5px of padding → 10px.</p>
            <p>I could make that change myself.</p>
            <p>But I can't conveniently load, edit, compile and preview the Android project locally.</p>
            <p>So the workflow can become:</p>
            <p className="font-mono text-xs text-foreground/70">
              change code → push to GitHub → GitHub Actions compiles APK → download/install build → open it → inspect the change → repeat
            </p>
            <p>
              Sometimes an entire APK has to be compiled just so I can find out whether a tiny UI adjustment looks right.
            </p>
            <p className="italic">It's frustrating.</p>
            <p>But there's something strangely appropriate about it too.</p>
            <p>
              PocketDev exists because developing from a phone is difficult—and PocketDev itself is being built through those same difficulties.
            </p>
            <p>It still has a lot to improve.</p>
            <p className="italic">That's part of why I'm still interested in it.</p>
          </StorySection>

          <StorySection heading="How I actually use AI">
            <p>
              There's another thing about the way I build that probably sounds strange at first.
            </p>
            <p>
              If AI gives me a piece of code, I test it, and it works correctly, I don't necessarily start asking:
            </p>
            <p className="italic">"Explain this function."</p>
            <p className="italic">"Explain that class."</p>
            <p className="italic">"Explain exactly how every part works."</p>
            <p>It's not because I think understanding code is unimportant.</p>
            <p>
              It's because when I'm actively building something,{" "}
              <strong className="text-foreground">the AI's context window is part of my development environment.</strong>
            </p>
            <p>
              Sometimes I've spent a long conversation getting the model to understand exactly what a feature is supposed to do, how the existing code is structured and what problems we've already solved.
            </p>
            <p>
              If I then fill that conversation with explanations of things I don't currently need, eventually the earlier context starts disappearing.
            </p>
            <p>
              And if I later need to change the feature, the AI may no longer remember why the code was written that way in the first place.
            </p>
            <p>So I tend to learn things when they become relevant to what I'm changing or debugging.</p>
            <p className="italic">It's certainly not a perfect workflow.</p>
            <p>
              It also means there are times when I'm dependent on AI for modifications I could probably make much faster myself if I had a normal development setup and deeper knowledge of the codebase.
            </p>
            <p>I don't really want to hide that.</p>
            <p>
              <strong className="text-foreground">AI is simultaneously the thing that has allowed me to build far beyond what I could otherwise build right now</strong>—and something that constantly shows me what I still need to learn.
            </p>
          </StorySection>

          <StorySection heading="Even the logo has a story.">
            <p>
              Eventually, if I was going to put all these things under one identity, I needed something that represented me.
            </p>
            <p>So I made the <strong className="text-foreground">LSGZ logo</strong>.</p>
            <p>It didn't start with an AI image generator.</p>
            <p className="font-medium text-foreground">It started with pen and paper.</p>
            <p>
              I drew the original idea myself, then later used AI to help polish and refine it digitally while keeping the identity of the original drawing.
            </p>
            <p className="italic">
              I like that little detail because, in a way, it's exactly how I've built most of my projects.
            </p>
            <p>The idea starts with me.</p>
            <p>The first version is usually imperfect.</p>
            <p>AI helps me push it much further.</p>
            <p className="font-medium text-foreground">Then I keep changing things until they feel like mine.</p>
          </StorySection>

          <StorySection heading="And eventually, I needed somewhere to put all of this.">
            <p>
              After finishing Class 12 and preparing to begin <strong className="text-foreground">B.Tech IT</strong>, I decided it was finally time to build a proper portfolio.
            </p>
            <p>
              <em>Not a page containing my name, three progress bars and a list of programming languages.</em>
            </p>
            <p>I wanted somewhere that actually represented the things I'd been making.</p>
            <p>So, like most of my projects, I kept iterating.</p>
            <p>
              Different AI systems helped with different pieces. I changed layouts, threw things away, rebuilt sections, obsessed over tiny details and kept polishing until the website started feeling like mine.
            </p>
            <p>There wasn't one prompt that produced it.</p>
            <p>There wasn't one AI that built it.</p>
            <p>
              It slowly came together through different tools, different models, experiments, mistakes and a lot of tiny decisions.
            </p>
            <p>
              Even my logo—the symbol sitting above all of it—started as something I drew on a piece of paper.
            </p>
            <p className="font-medium text-foreground">And that's the website you're reading now.</p>
          </StorySection>

          <StorySection heading="I don't really have a traditional development story.">
            <p>I didn't learn everything first and then start building.</p>
            <p>I did almost the opposite.</p>
            <p className="font-mono text-sm text-foreground/80">
              I wanted something → tried to build it → got stuck → learned what I needed → got it working → found another problem.
            </p>
            <p>AI has been part of that process from the beginning.</p>
            <p>
              I don't pretend I manually wrote every line of code. I use AI aggressively—as a coding tool, debugger, researcher, designer and sometimes as a way of understanding technology I haven't encountered before.
            </p>
            <p>
              But <strong className="text-foreground">deciding what should exist, connecting the pieces, dealing with things when they don't work, refining the experience and deciding when something is finally worth shipping</strong>—that part is mine.
            </p>
            <p>
              And doing all of this from a phone has forced me to get comfortable with another part of building:
            </p>
            <p className="font-medium text-foreground">finding another way.</p>
            <p>Can't run something locally?</p>
            <p className="text-foreground">Find somewhere that can.</p>
            <p>Need a GPU?</p>
            <p className="text-foreground">Use Colab or Kaggle.</p>
            <p>Can't use Android Studio?</p>
            <p className="text-foreground">Compile remotely with GitHub Actions.</p>
            <p>An API becomes paid?</p>
            <p className="text-foreground">Find another approach.</p>
            <p>The tool I want doesn't exist on Android?</p>
            <p className="text-foreground">Try building it.</p>
            <p>I didn't decide at the beginning that this would be some kind of philosophy.</p>
            <p>It just became the way I worked.</p>
            <p>
              And somehow, a journey that started with a few static HTML pages hosted from a phone turned into bots, AI experiments, trained models, an Android code editor and products used by people I've never met.
            </p>
            <p className="mt-8 text-lg font-medium text-foreground">
              I'm still at the beginning.
            </p>
          </StorySection>
        </div>
      </div>
    </section>
  );
}
