(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Responsive navigation
  const menuToggle = $(".menu-toggle");
  const navLinks = $("#nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    $$(".nav-link, .nav-cta", navLinks).forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header treatment and current-section navigation state
  const header = $(".site-header");
  const sections = $$("main section[id]");
  const navItems = $$(".nav-link");
  const updateScrollState = () => {
    header?.classList.toggle("scrolled", window.scrollY > 12);
    const marker = window.scrollY + window.innerHeight * 0.32;
    let current = sections[0]?.id || "home";
    sections.forEach(section => {
      if (section.offsetTop <= marker) current = section.id;
    });
    navItems.forEach(link => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  updateScrollState();

  // Rotating positioning statement
  const roleNode = $("#role-rotator");
  const roles = ["reliable AI systems.", "LLM & RAG applications.", "computer vision pipelines.", "production-minded ML workflows."];
  let roleIndex = 0;
  if (roleNode && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      roleNode.classList.add("role-fade");
      window.setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleNode.textContent = roles[roleIndex];
        roleNode.classList.remove("role-fade");
      }, 180);
    }, 3000);
  }

  // Reveal-on-scroll enhancement; content remains visible without JS or IntersectionObserver
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".section-heading, .about-main, .about-aside, .stat-block, .expertise-card, .project-card, .timeline-item, .study-panel, .writing-card, .contact-copy, .contact-panel").forEach(node => {
      node.classList.add("reveal");
      revealObserver.observe(node);
    });
  }

  // Project filtering
  const projectCards = $$(".project-card");
  const filterButtons = $$(".filter-btn");
  const countLabel = $("#project-count");
  const filterProjects = filter => {
    let visible = 0;
    projectCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    if (countLabel) countLabel.textContent = `SHOWING ${String(visible).padStart(2, "0")} PROJECT${visible === 1 ? "" : "S"}`;
  };
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterProjects(button.dataset.filter);
  }));
  filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.classList.contains("active"))));

  // Project detail content. Descriptions reflect the public portfolio and project notes.
  const projects = {
    documind: {
      category: "GENERATIVE AI · DOCUMENT INTELLIGENCE",
      title: "DocuMind AI — Agentic RAG Document Assistant",
      description: "A document question-answering system designed around an agentic router. Rather than forcing every request through one fixed retrieval path, the workflow can select between document retrieval, summarization and calculation tools based on user intent.",
      highlights: ["Routes requests to task-appropriate tools using LLM function calling.", "Combines document retrieval with summarization and calculation capabilities.", "Explores practical orchestration patterns for grounded document workflows."],
      tech: ["Python", "RAG", "LLM function calling", "Groq", "Llama 3.1 8B"],
      url: "https://github.com/jmhasan1/DocuMind-AI"
    },
    obsidian: {
      category: "GENERATIVE AI · RETRIEVAL",
      title: "Obsidian RAG Assistant",
      description: "A retrieval assistant for personal knowledge stored in Obsidian. The project explores hybrid retrieval and diagnostics so that retrieval behaviour can be inspected and improved rather than treated as a black box.",
      highlights: ["Combines semantic retrieval and BM25 keyword search.", "Uses reciprocal-rank fusion to merge retrieval signals.", "Includes relevance gating and tests for retrieval components."],
      tech: ["Python", "SentenceTransformers", "BM25", "RRF", "Streamlit"],
      url: "https://github.com/jmhasan1/ObsidianRAGAssistant"
    },
    reviewer: {
      category: "AGENTIC AI · DEVELOPER TOOLS",
      title: "AI Code Reviewer & Bug-Fixing Agent",
      description: "An agentic code-review workflow that uses code-aware context to identify issues, reason about potential fixes and validate changes with automated checks.",
      highlights: ["Uses code-aware retrieval to ground review context.", "Structures analysis and fix generation as an agent workflow.", "Includes validation-oriented tooling and automated tests."],
      tech: ["Python", "LangGraph", "FastAPI", "ChromaDB", "LLMs", "pytest"],
      url: "https://github.com/jmhasan1/AI-Code-Reviewer-Bug-Fixing-Agent"
    },
    security: {
      category: "MACHINE LEARNING · MLOPS",
      title: "Network Security Log Triage Agent",
      description: "A security-oriented project bringing together log analysis and ML engineering practices. The repository work includes dependency maintenance, environment reproducibility and application testing.",
      highlights: ["Organizes security-log triage into modular components.", "Emphasizes reproducible project configuration and dependency hygiene.", "Uses experiment and application tooling to support iterative development."],
      tech: ["Python", "Machine Learning", "MLflow", "uv", "pytest"],
      url: "https://github.com/jmhasan1/Network-Security-Log-Triage-Agent"
    },
    laser: {
      category: "COMPUTER VISION · INDUSTRIAL SAFETY",
      title: "Forklift Laser Boundary Detection",
      description: "A real-time computer vision pipeline developed for forklift laser-boundary detection. It was designed to run on an Intel i5 CPU using 1248×720 footage and to meet a stated minimum throughput requirement of 2 FPS.",
      highlights: ["Segments laser regions using HSV colour thresholds.", "Applies morphology, contour extraction, clustering and quadrilateral fitting.", "Uses temporal tracking to stabilize detections across frames."],
      tech: ["Python", "OpenCV", "HSV segmentation", "Morphology", "Contours", "Temporal tracking"],
      url: "https://github.com/jmhasan1/Laser_mask"
    },
    ocr: {
      category: "DOCUMENT AI · EVALUATION",
      title: "OCR Document Evaluation Pipeline",
      description: "A modular project for evaluating OCR document processing, with portability and performance benchmarking as explicit goals. Work includes GPU detection and testing on an NVIDIA GTX 1650 Ti environment.",
      highlights: ["Structures OCR execution and evaluation as a modular pipeline.", "Checks runtime device availability for CPU/GPU portability.", "Benchmarks PaddleOCR execution on available hardware."],
      tech: ["Python", "PaddleOCR", "PaddlePaddle", "CUDA", "Benchmarking"],
      url: "https://github.com/jmhasan1/ocr-document-evaluation"
    },
    translator: {
      category: "NLP · TRANSFORMER ARCHITECTURES",
      title: "Transformer Language Translator",
      description: "A neural machine translation implementation exploring the Transformer architecture and its constituent components, from tokenization and attention to evaluation and inference.",
      highlights: ["Implements a Transformer-based translation workflow in PyTorch.", "Explores tokenization and attention mechanisms.", "Uses BLEU-oriented evaluation and a web inference interface."],
      tech: ["Python", "PyTorch", "Transformers", "Tokenization", "BLEU"],
      url: "https://github.com/jmhasan1/Language_Translator_Transformer_Model"
    },
    medical: {
      category: "MACHINE LEARNING · MULTIMODAL VISION",
      title: "Medical vs Non-medical Image Classification",
      description: "An image-classification project combining convolutional and vision-language representations to study medical versus non-medical image separation.",
      highlights: ["Uses MobileNetV2 embeddings as visual representations.", "Explores CLIP ViT-B/32 embeddings for image semantics.", "Applies clustering-based analysis to inspect representation structure."],
      tech: ["Python", "PyTorch", "MobileNetV2", "CLIP ViT-B/32", "KMeans"],
      url: "https://github.com/jmhasan1/Medical-vs-Non-medical-Image-Classification"
    }
  };

  const modal = $("#project-modal");
  const modalTitle = $("#modal-title");
  const modalCategory = $("#modal-category");
  const modalDescription = $("#modal-description");
  const modalHighlights = $("#modal-highlights");
  const modalTech = $("#modal-tech");
  const modalSource = $("#modal-source");
  let lastFocused = null;

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocused?.focus();
  };
  const openModal = key => {
    const data = projects[key];
    if (!data || !modal) return;
    lastFocused = document.activeElement;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalHighlights.replaceChildren(...data.highlights.map(item => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }));
    modalTech.replaceChildren(...data.tech.map(item => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    modalSource.href = data.url;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    $(".modal-close", modal).focus();
  };
  $$("[data-open]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.open)));
  $$(".modal-close, .modal-dismiss").forEach(button => button.addEventListener("click", closeModal));
  modal?.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", event => {
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "Tab") {
      const focusables = $$('a[href], button:not([disabled])', modal);
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });

  // Small details
  const yearNode = $("#year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
})();
