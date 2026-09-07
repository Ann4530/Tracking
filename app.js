/* The sprint is intentionally data-first: the UI is only a projection of this
   object, so changing a date or an outcome never requires changing markup. */
const tracks = {
  se: { label: "Kỹ thuật phần mềm (Software Engineering)", short: "SE", color: "blue", target: 60, unit: "giờ", icon: "▰" },
  ai: { label: "Trí tuệ nhân tạo (Artificial Intelligence)", short: "AI", color: "purple", target: 60, unit: "giờ", icon: "◇" },
  ielts: { label: "IELTS", short: "IELTS", color: "yellow", target: 112, unit: "hours", icon: "◉" },
  app: { label: "Phát hành App", short: "APP", color: "orange", target: 100, unit: "người dùng", icon: "▱" },
  channel: { label: "Kênh cá nhân", short: "KÊNH", color: "cyan", target: 1000, unit: "người đăng ký", icon: "◌" },
  jobs: { label: "Tìm việc", short: "VIỆC", color: "green", target: 2, unit: "lời mời phỏng vấn", icon: "↗" }
};
const baseTasks = {
  se: ["Phân biệt Linux kernel và user space; khám phá /proc và /sys", "Xây dựng log-analyzer.sh với pipe, awk và exit code", "Theo dõi process, signal và mối quan hệ parent/child", "Khám phá DNS, TCP, HTTP bằng curl, dig và ss", "Xây dựng system-monitor.sh và công cụ backup", "Thực hành Git branching và rebase", "Đóng gói Ubuntu system toolkit cùng README"],
  ai: ["Giải thích vòng lặp huấn luyện ML từ tensor đến optimizer", "Tự triển khai linear regression và vẽ loss", "So sánh learning rate của gradient descent trong một experiment", "Tự triển khai forward/backward pass của MLP bằng PyTorch", "Kiểm tra gradient qua một neural network nhỏ", "Xây dựng training loop với DataLoader và optimizer", "So sánh các optimizer và viết báo cáo experiment"],
  ielts: ["Hoàn thành bài diagnostic: listening, reading, writing, speaking", "Luyện listening và reading có bấm giờ; ghi lại từng lỗi", "Viết Task 2 và thu âm một bài speaking response", "Luyện listening và reading kèm phân tích lỗi", "Làm full Listening test và phân tích lỗi", "Viết Task 1 và tự đánh giá theo rubric", "Hoàn thành full IELTS mock và ghi lại band điểm"],
  app: ["Audit app và phân loại bug P0/P1/P2", "Sửa toàn bộ bug P0 và bổ sung ghi chú tái hiện", "Kiểm thử network failure, empty state và error state", "Tạo production build và smoke test", "Chuẩn bị icon, screenshot và metadata cho store", "Hoàn thiện privacy, release notes và signing", "Submit lên Google Play nếu đạt readiness gate"],
  channel: ["Xác định niche, audience, content pillar và visual style", "Tạo 20 ý tưởng và viết 5 hook", "Quay 2 video có sự xuất hiện của bạn", "Edit video 1 với caption và B-roll", "Edit video 2 với motion graphics", "Publish video đầu tiên và xem lại analytics", "Xác định format hiệu quả nhất từ analytics tuần đầu"],
  jobs: ["Audit CV, GitHub, LinkedIn và portfolio", "Xác định 10 công ty và vị trí mục tiêu", "Gửi các application đầu tiên có chọn lọc và networking", "Apply và gửi 2 tin nhắn outreach thân thiện", "Gửi các application chất lượng cao", "Follow up với recruiter và chuẩn bị câu chuyện phỏng vấn", "Review funnel và lên lịch chuẩn bị phỏng vấn"]
};
const outputs = {
  se: ["Linux architecture diagram + notes", "Executable log-analyzer.sh", "process-manager.sh + debugging notes", "network-check.sh + request trace", "system toolkit scripts", "branching-lab README", "GitHub repo + README"],
  ai: ["ML loop explanation", "linear_regression.py + loss chart", "learning-rate comparison", "PyTorch MLP notebook", "gradient inspection notes", "reproducible training script", "optimizer comparison report"],
  ielts: ["baseline bands recorded", "error log with patterns", "Task 2 draft + speaking recording", "timed practice score", "listening error analysis", "Task 1 submission", "mock bands + next actions"],
  app: ["audit backlog with priorities", "P0 fixes merged", "error-state checklist", "signed build artifact", "store asset folder", "release checklist", "submission decision"],
  channel: ["one-page content strategy", "idea bank + hooks", "raw footage for two videos", "edited video draft", "published-ready video", "video 1 live", "format performance note"],
  jobs: ["profile audit checklist", "target company list", "application tracker", "outreach log", "applications submitted", "follow-up list", "funnel review"]
};
const taskDocs = {
  se: [
    "Linux Journey — Linux Basics / Filesystem; `man intro`; `man hier`",
    "GNU Coreutils; Bash manual; command help with `--help`",
    "`procfs` / `sysfs`; `ps`, `top`, `kill`, signal notes",
    "Networking basics; `curl`, `dig`, `ss`, `netstat` references",
    "Systemd timers; `cron`; `tar`; `rsync` documentation",
    "Git branching and rebase guide; conflict resolution notes",
    "Packaging checklist; README template; release hygiene notes"
  ],
  ai: [
    "D2L Ch.2; tensor notes; NumPy/PyTorch shape cheat sheet",
    "D2L Ch.3; linear regression chapter; MSE derivation notes",
    "D2L optimization notes; gradient descent examples",
    "PyTorch autograd docs; multilayer perceptron examples",
    "Gradient checking notes; loss-curve plotting template",
    "DataLoader and optimizer docs; training loop reference",
    "Optimizer comparison notes; experiment log template"
  ],
  ielts: [
    "Official IELTS overview; band descriptors; baseline checklist",
    "Timed listening/reading practice; error log template",
    "Writing Task 2 prompt bank; speaking recording checklist",
    "Error analysis template; Cambridge practice set notes",
    "Listening transcript review; correction pattern log",
    "Writing Task 1 band descriptors; model answer notes",
    "Full mock test sheet; score summary template"
  ],
  app: [
    "README / architecture map; bug triage template",
    "Issue tracker; reproduction checklist; priority rubric",
    "Offline / empty / error-state references",
    "Build + smoke test checklist; release workflow notes",
    "Store asset guidelines; screenshot checklist",
    "Privacy, signing, and release-note checklist",
    "Play Console submission checklist; rollout notes"
  ],
  channel: [
    "Audience map; niche worksheet; content pillar template",
    "Hook library; idea bank; short-form outline notes",
    "Shot list; filming checklist; recording setup notes",
    "Caption and B-roll editing guide; export checklist",
    "Motion graphics references; thumbnail inspiration notes",
    "Analytics dashboard; publishing checklist; review log",
    "Format experiment log; iteration notes; next-test plan"
  ],
  jobs: [
    "Resume checklist; GitHub audit; LinkedIn profile notes",
    "Target company research template; role shortlist",
    "Application tracker; outreach script; networking notes",
    "Follow-up templates; response tracking sheet",
    "Portfolio polish checklist; cover letter notes",
    "Mock interview bank; STAR story framework",
    "Pipeline review matrix; next-step planning sheet"
  ]
};
const trackWindows = {
  se: "07:30–10:00",
  ai: "10:30–13:00",
  ielts: "14:00–18:00",
  app: "19:00–21:00",
  channel: "21:00–22:00",
  jobs: "22:30–23:30",
  review: "23:30–00:00"
};
// The master timetable is intentionally explicit: each day has its own task
// instead of recycling a seven-day template across the four sprint weeks.
const masterTasks = {
  se: [
    "Linux architecture: kernel, user space, system calls, filesystem, /proc, /sys, /dev",
    "Shell fundamentals: stdin, stdout, stderr, pipes, redirects, grep, sort, wc; build a file report",
    "Processes: PID, PPID, parent/child, states, foreground/background, signals, /proc/<pid>",
    "Networking basics: client/server, IP, port, socket, DNS, TCP/UDP; trace one HTTP request",
    "Bash scripting: variables, arguments, conditionals, loops, functions, exit codes; build system-health.sh",
    "Git internals: working tree, staging, commit, branch, merge, rebase, reset, revert, stash, reflog",
    "Build Ubuntu System Diagnostic Toolkit and write the README",
    "Computer systems: CPU, registers, cache, RAM, storage, I/O, context switch; run a benchmark",
    "HTTP: methods, status codes, headers, body, cookies, sessions, JWT; inspect with curl",
    "Backend architecture: client, API, controller, service, repository, database, middleware, validation",
    "PostgreSQL: schema, keys, joins, indexes, transactions, ACID, isolation, locks; run EXPLAIN",
    "Build FastAPI + PostgreSQL CRUD API with validation, error handling, and logging",
    "Redis caching and RabbitMQ messaging; connect API, queue, worker, and PostgreSQL",
    "System architecture review: synchronous vs asynchronous, cache, queue, worker, and failure paths",
    "Dockerize the FastAPI backend with image, container, layer, volume, network, and registry",
    "Docker Compose: run FastAPI, PostgreSQL, Redis, and RabbitMQ with one command",
    "CI/CD with GitHub Actions: test, build, containerize, and prepare deployment",
    "AWS deployment concepts: EC2, S3, RDS, VPC, IAM, CloudWatch; deploy the backend",
    "Kubernetes mental model: cluster, node, pod, deployment, service, ingress, config, secret",
    "Deploy FastAPI to Kubernetes and practice get, describe, logs, exec, apply, delete",
    "End-to-end production path: GitHub, CI/CD, Docker, API, data, queue, workers, Kubernetes",
    "System design: latency, throughput, availability, scalability, caching, load balancer, replication",
    "Distributed systems: scaling, replication, partitioning, CAP, consistency, retry, timeout, idempotency",
    "Security: authentication, authorization, JWT, OAuth, TLS, secrets, CORS, OWASP, rate limiting",
    "Observability: logs, metrics, traces, health checks, monitoring, alerting, latency, error rate",
    "Production AI backend design: gateway, FastAPI, AI service, PostgreSQL, Redis, RabbitMQ",
    "Multi-agent production architecture: orchestrator, agents, tools, RAG, database, queue, observability",
    "Design the final AI product architecture and explain why every component exists"
  ],
  ai: [
    "D2L Ch.2: tensors, shapes, indexing, broadcasting, linear algebra, calculus, and autograd",
    "D2L Ch.3: linear regression from scratch with hypothesis, MSE, gradients, and loss curve",
    "D2L Ch.3: softmax regression, logits, probabilities, cross entropy, and Fashion-MNIST",
    "D2L Ch.4: MLP from scratch and concise implementation; forward pass and activations",
    "D2L Ch.4: underfitting, overfitting, weight decay, dropout; run a regularization experiment",
    "D2L Ch.4.7: backpropagation, chain rule, loss.backward(), optimizer.step(), and explanation",
    "Consolidate linear regression, softmax, MLP, and backprop into one training README",
    "D2L Ch.5: layers, parameters, deferred initialization, nn.Module, Parameter, and forward()",
    "D2L Ch.5: custom layers, file I/O, CPU vs GPU, device transfer, and checkpoints",
    "D2L Ch.6: why convolution, kernels, feature maps, padding, and stride; build CNN from scratch",
    "D2L Ch.6: channels, pooling, LeNet; train a small CNN classifier",
    "D2L Ch.7: AlexNet, VGG, NiN, and GoogLeNet; explain CNN evolution",
    "D2L Ch.7: BatchNorm, ResNet, DenseNet; run a ResNet experiment",
    "D2L Ch.11: optimization, convexity, gradient descent, SGD, and minibatch SGD comparison",
    "D2L Ch.11: Momentum, Adagrad, RMSProp, Adadelta, Adam, and learning-rate schedulers",
    "D2L Ch.10: attention cues, Nadaraya-Watson, attention scoring, and Query/Key/Value",
    "D2L Ch.10.4: Bahdanau attention; explain the limitation of plain RNN sequence encoding",
    "D2L Ch.10.5: multi-head attention; implement Q, K, V and multiple heads",
    "D2L Ch.10.6: self-attention and positional encoding; explain why position is needed",
    "D2L Ch.10.7: Transformer architecture from embedding to residual and LayerNorm",
    "Implement or review the Transformer end to end without training an LLM",
    "D2L Ch.14: Word2Vec, GloVe, subword, similarity, analogy, and semantic vector space",
    "D2L Ch.14: BERT representation, dataset, and pretraining; contextual embeddings",
    "LLM architecture: tokenizer, token IDs, embedding, context window, logits, next-token prediction",
    "LLM inference: temperature, top-k, top-p, greedy decoding, KV cache, batching, latency",
    "RAG: parsing, chunking, embedding, vector DB, retrieval, reranking, context, citations, evaluation",
    "Single-agent and multi-agent design: tools, planning, memory, routing, state, retries, human review",
    "Build the final AI Agent Product Prototype with tools, RAG, database, tests, and README"
  ],
  ielts: [
    "Full diagnostic: Listening, Reading, Writing Task 2, and Speaking recording",
    "Listening + Reading timed practice and vocabulary review",
    "Listening + Reading error analysis and Speaking Part 1",
    "Listening + Reading practice and Writing Task 2",
    "Listening + Reading practice with detailed error analysis",
    "Writing Task 2 rewrite using the four criteria and Speaking Part 2",
    "FULL MOCK #1 and band score analysis",
    "Listening and Reading weak-area drills",
    "Writing Task 2: plan, write, check, rewrite",
    "Listening + Reading timed set and error log",
    "Writing Task 1: overview, comparisons, data language, and rewrite",
    "Listening + Reading timed practice and vocabulary",
    "Writing Task 2 + Speaking practice with recording review",
    "FULL MOCK #2 and band score analysis",
    "Listening + Reading timed practice",
    "Writing Task 2 under time pressure and rubric self-check",
    "Listening + Reading weak-area correction",
    "Writing Task 1 timed response and rewrite",
    "Listening + Reading timed practice and error patterns",
    "Writing + Speaking mock with feedback notes",
    "FULL MOCK #3 and action plan",
    "Focus on the weakest skill from the three mock tests",
    "Writing Task 2: argument quality, coherence, vocabulary, grammar",
    "Listening + Reading and Speaking fluency practice",
    "Writing Task 1 timed response and band-descriptor review",
    "Listening + Reading and Speaking pronunciation practice",
    "FULL MOCK #4 and final gap analysis",
    "FINAL MOCK, complete analysis, and next 30-day study plan"
  ],
  app: [
    "Audit architecture and bugs; create P0/P1/P2 backlog", "Fix P0 blockers and add reproduction notes", "Fix remaining P0/P1 bugs", "UX audit and improve error handling", "Create production build", "Run regression and smoke testing", "Weekly release review", "Resolve release blockers", "Prepare store listing and assets", "Submit to Google Play if ready", "Fix post-submit or remaining bugs", "Add analytics and event tracking", "Collect and classify user feedback", "Release review and decision log", "Implement the highest-value growth improvement", "Implement the second growth improvement", "Review user feedback and prioritize", "Fix bugs from real usage", "Review analytics and funnel drop-off", "Improve retention or onboarding", "Run a growth experiment", "Review user feedback and support issues", "Run another focused growth experiment", "Review analytics against targets", "Improve retention loop", "Run final growth experiment", "Final optimization and cleanup", "Write app report and next roadmap"
  ],
  channel: [
    "Define niche, audience, and three content pillars", "Generate ideas and hooks; select the best five", "Write scripts and shoot video", "Shoot the next video", "Edit video with captions and B-roll", "Create thumbnail and publishing assets", "Publish and review analytics", "Research audience and winning topics", "Write the next script", "Shoot the next video", "Edit and package the video", "Publish and record baseline analytics", "Analyze views, retention, and engagement", "Weekly format analysis", "Research the winning format", "Write a winning-format script", "Shoot the winning-format video", "Edit the winning-format video", "Publish and track performance", "Analyze retention and subscriber gain", "Double down on the best signal", "Research a new angle for the winning pillar", "Write the next script", "Shoot the next video", "Edit the next video", "Publish and track performance", "Analyze results and decide what to repeat", "Write the winning-format report"
  ],
  jobs: [
    "Audit CV, GitHub, LinkedIn, and portfolio", "Research target companies and send 2 applications", "Send 2 targeted applications", "Send 2 targeted applications", "Send 2 targeted applications", "Send 2 targeted applications", "Funnel review", "Send 2 targeted applications", "Send 2 targeted applications", "Send 2 targeted applications", "Interview preparation: technical and behavioral", "Send 2 targeted applications", "Networking and outreach", "Funnel review", "Send 2 targeted applications", "Send 2 targeted applications", "Technical preparation", "Send 2 targeted applications", "Send 2 targeted applications", "Interview preparation", "Funnel review", "Send 2 targeted applications", "Send 2 targeted applications", "Technical interview preparation", "Send 2 targeted applications", "Send 2 targeted applications", "Interview preparation", "Final funnel review and next pipeline"
  ]
};
const masterDocs = {
  se: "Dùng tài liệu chính thức của công cụ trong ngày; ghi lệnh đã chạy và kết quả vào README",
  ai: "Dive into Deep Learning (D2L), PyTorch Documentation; lưu notebook, biểu đồ và kết luận experiment",
  ielts: "Cambridge IELTS, IELTS Band Descriptors, IELTS Liz, Cambridge Dictionary và YouGlish",
  app: "README/issue tracker của project, release checklist, Google Play Console và analytics của app",
  channel: "Content strategy worksheet, nền tảng analytics, checklist script/quay/edit/publish",
  jobs: "Checklist CV/GitHub/LinkedIn, application tracker, STAR interview framework và mẫu outreach"
};
const masterTaskVi = {
  se: [
    "Học kernel và user space; đọc /proc, /sys, /dev; vẽ sơ đồ Linux; tạo system-inventory.sh",
    "Thực hành stdin/stdout/stderr, pipe, redirect, grep, sort, wc; lọc 1.000 file và xuất file report",
    "Theo dõi PID, PPID, process state, foreground/background và signal bằng ps, top, pstree, kill; tạo process-monitor.sh",
    "Dùng ip, ss, ping, curl, dig, traceroute để đi từ domain đến HTTP response; ghi lại request trace",
    "Viết system-health.sh kiểm tra CPU, RAM, disk, process và network; xử lý biến, vòng lặp, exit code",
    "Tạo git-lab thực hành branch, merge, rebase, reset, revert, stash, reflog; viết README giải thích khác nhau",
    "Gộp các script thành Ubuntu System Diagnostic Toolkit; chạy thử và hoàn thiện README",
    "Đo CPU, RAM, storage, I/O và context switch; chạy benchmark rồi ghi lại nhận xét",
    "Dùng curl kiểm tra method, status code, header, body, cookie, session và JWT của một HTTP API",
    "Vẽ luồng client → API → controller → service → repository → database; ghi rõ trách nhiệm từng lớp",
    "Tạo bảng PostgreSQL, khóa chính/ngoại, JOIN, index, transaction; chạy EXPLAIN và thử COMMIT/ROLLBACK",
    "Xây FastAPI + PostgreSQL CRUD cho users; thêm validation, error handling và logging; test đủ 5 endpoint",
    "Thêm Redis cache và RabbitMQ; nối API → queue → worker → PostgreSQL; ghi lại luồng message và retry",
    "Vẽ kiến trúc gồm API, PostgreSQL, Redis, RabbitMQ, worker; ghi khi nào dùng synchronous/asynchronous",
    "Viết Dockerfile cho FastAPI; build image, chạy container, gắn volume/network và kiểm tra health endpoint",
    "Viết docker-compose.yml chạy FastAPI, PostgreSQL, Redis, RabbitMQ bằng một lệnh docker compose up",
    "Tạo GitHub Actions chạy test, build Docker image và kiểm tra lỗi khi push code",
    "Thực hành EC2, S3, RDS, VPC, IAM, CloudWatch; deploy backend và ghi lại các bước triển khai",
    "Tạo manifest Kubernetes cho Pod, Deployment, Service, Ingress, ConfigMap và Secret",
    "Deploy FastAPI lên Kubernetes; thực hành kubectl get, describe, logs, exec, apply, delete",
    "Nối GitHub → CI/CD → Docker → FastAPI → PostgreSQL/Redis/RabbitMQ → Kubernetes; chạy một luồng end-to-end",
    "Thiết kế hệ thống theo latency, throughput, availability, scalability, cache, load balancer và replication",
    "Phân tích distributed system: horizontal scaling, partitioning, CAP, consistency, retry, timeout, idempotency",
    "Bổ sung authentication, authorization, JWT, HTTPS/TLS, secrets, CORS, OWASP và rate limiting cho API",
    "Thêm logs, metrics, traces, health check, latency và error rate; tạo dashboard hoặc báo cáo quan sát",
    "Thiết kế production AI backend: API Gateway → FastAPI → AI Service → PostgreSQL/Redis/RabbitMQ",
    "Thiết kế Agent Orchestrator, các agent, tools, RAG, database, queue, worker và observability; mô tả đường đi của request",
    "Vẽ kiến trúc sản phẩm cuối cùng và giải thích vì sao từng component tồn tại; chốt backlog để build"
  ],
  ai: [
    "D2L Ch.2: tạo tensor, kiểm tra shape/index/broadcasting, nhân ma trận, tính gradient bằng autograd; lưu notebook",
    "D2L Ch.3: tự code linear regression với y_hat = Xw + b, MSE, gradient descent; vẽ loss curve",
    "D2L Ch.3: tự code softmax regression; train Fashion-MNIST và ghi accuracy, cross-entropy, lỗi thường gặp",
    "D2L Ch.4: code MLP từ đầu và bằng PyTorch; giải thích neuron, layer, ReLU, sigmoid, forward pass",
    "D2L Ch.4: so sánh baseline, weight decay và dropout; vẽ loss/accuracy và kết luận overfitting",
    "D2L Ch.4.7: theo dõi Forward → Loss → Gradient → Chain Rule → Backward → Update; viết backprop-explanation.md",
    "Hoàn thiện README giải thích cách train linear regression, softmax, MLP và backprop; gom notebook thành một lab",
    "D2L Ch.5: tạo nn.Module, Parameter, forward và deferred initialization; lưu pytorch_model_basics.ipynb",
    "D2L Ch.5: viết custom layer, lưu/đọc checkpoint, chạy CPU/GPU và đo sự khác biệt bằng tensor.to(device)",
    "D2L Ch.6: minh họa image → kernel → feature map; tự code convolution với padding và stride",
    "D2L Ch.6: thêm channels và pooling; xây CNN kiểu LeNet và ghi accuracy trên dataset nhỏ",
    "Đọc AlexNet, VGG, NiN, GoogLeNet; vẽ sơ đồ tiến hóa CNN và ghi điểm mạnh/yếu của từng kiến trúc",
    "Thử BatchNorm, ResNet, DenseNet; chạy một experiment và ghi ảnh hưởng đến tốc độ hội tụ",
    "D2L Ch.11: chạy GD, SGD và mini-batch SGD trên cùng dataset; so sánh loss và thời gian",
    "So sánh SGD, Momentum, Adagrad, RMSProp, Adadelta, Adam và learning-rate scheduler; lập bảng kết quả",
    "D2L Ch.10: minh họa Query, Key, Value và attention score bằng một ví dụ nhỏ có số liệu",
    "Học Bahdanau Attention; viết giải thích attention giải quyết vấn đề gì của RNN và lưu ví dụ",
    "Tự implement Q, K, V và multi-head attention; kiểm tra shape ở từng bước",
    "Tự tính self-attention và positional encoding; giải thích vì sao Transformer cần vị trí token",
    "Vẽ Transformer: embedding → positional encoding → self-attention → FFN → residual → LayerNorm",
    "Review hoặc implement Transformer end-to-end; giải thích từng tensor đi qua model như thế nào",
    "D2L Ch.14: tạo word vectors bằng Word2Vec/GloVe/subword; thử similarity và analogy",
    "D2L Ch.14: học BERT representation, dataset, pretraining; giải thích contextual embedding",
    "Vẽ luồng LLM: tokenizer → token IDs → embedding → Transformer → logits → softmax → token kế tiếp",
    "Thử greedy, temperature, top-k, top-p; ghi ảnh hưởng đến output, KV cache, batching và inference latency",
    "Xây RAG prototype: parse → chunk → embedding → vector DB → retrieve → rerank → context → answer; thêm citation",
    "Thiết kế Agent và Multi-Agent: tool calling, planning, routing, memory, shared state, retry và human-in-the-loop",
    "Build AI Agent Product Prototype có tools, RAG, database, tests, README và architecture.md"
  ],
  ielts: [
    "Làm full diagnostic Listening/Reading, viết Writing Task 2, thu âm Speaking; ghi band từng kỹ năng",
    "Làm Listening và Reading có bấm giờ; chữa từng câu sai và tạo sổ vocabulary",
    "Làm Listening/Reading; phân loại lỗi; luyện Speaking Part 1 và tự nghe lại recording",
    "Làm Listening/Reading; viết Writing Task 2; tự chấm theo Task Response, Coherence, Lexical, Grammar",
    "Làm Listening/Reading; đối chiếu transcript; ghi 3 dạng lỗi lặp lại nhiều nhất",
    "Viết lại Writing Task 2 sau khi chữa lỗi; luyện Speaking Part 2 trong thời gian quy định",
    "Làm FULL MOCK #1 đủ 4 kỹ năng; ghi điểm và chọn 2 kỹ năng yếu nhất",
    "Luyện riêng các dạng câu hỏi Listening/Reading đang sai nhiều nhất; cập nhật error log",
    "Viết Writing Task 2 có dàn ý, bài hoàn chỉnh, tự chấm và viết lại đoạn yếu nhất",
    "Làm Listening/Reading timed set; ghi thời gian, số câu đúng và nguyên nhân sai",
    "Viết Writing Task 1: overview, so sánh số liệu, nhóm thông tin; tự chấm theo band descriptors",
    "Làm Listening/Reading timed practice; học vocabulary từ chính các câu sai",
    "Viết Writing Task 2 và thu âm Speaking; nghe lại để sửa phát âm, fluency và grammar",
    "Làm FULL MOCK #2; so sánh với Mock #1 và cập nhật kế hoạch học",
    "Làm Listening/Reading có bấm giờ; tập trung dạng bài yếu nhất",
    "Viết Writing Task 2 dưới áp lực thời gian; kiểm tra đủ 4 tiêu chí trước khi nộp",
    "Làm Listening/Reading; chữa lỗi theo pattern thay vì chỉ xem đáp án",
    "Viết Writing Task 1 có bấm giờ; viết lại phần overview và câu so sánh",
    "Làm Listening/Reading; thống kê lỗi theo dạng câu hỏi và từ vựng",
    "Làm Speaking mock và Writing mock; ghi âm, tự chấm và chọn lỗi cần sửa",
    "Làm FULL MOCK #3; lập action plan cho kỹ năng có band thấp nhất",
    "Dành cả buổi cho kỹ năng yếu nhất; đo lại bằng một mini test cuối buổi",
    "Viết Writing Task 2 tập trung lập luận, coherence, vocabulary và grammar",
    "Làm Listening/Reading và Speaking; luyện trả lời trôi chảy không học thuộc",
    "Viết Writing Task 1 có bấm giờ; đối chiếu band descriptors và sửa bài",
    "Làm Listening/Reading và Speaking; luyện pronunciation, stress và intonation",
    "Làm FULL MOCK #4; so sánh xu hướng điểm qua 4 mock",
    "Làm FINAL MOCK, phân tích toàn bộ lỗi và lập kế hoạch IELTS 30 ngày tiếp theo"
  ],
  app: ["Audit architecture và bug; lập backlog P0/P1/P2", "Sửa blocker P0 và ghi bước tái hiện", "Sửa bug P0/P1 còn lại và thêm regression test", "Audit UX và xử lý error state", "Tạo production build", "Chạy regression test và smoke test", "Review release tuần 1", "Xử lý release blocker", "Chuẩn bị store listing, icon, screenshot, metadata", "Submit Google Play nếu đạt readiness gate", "Sửa bug sau submit hoặc bug còn tồn", "Thêm analytics và event tracking", "Thu thập và phân loại user feedback", "Review release và ghi quyết định", "Thực hiện growth improvement ưu tiên cao nhất", "Thực hiện growth improvement thứ hai", "Review feedback và sắp xếp lại ưu tiên", "Sửa bug từ dữ liệu sử dụng thật", "Phân tích funnel và điểm rơi người dùng", "Cải thiện onboarding hoặc retention", "Chạy một growth experiment", "Review feedback và vấn đề hỗ trợ", "Chạy growth experiment tiếp theo", "So sánh analytics với target", "Cải thiện retention loop", "Chạy growth experiment cuối", "Tối ưu và dọn dẹp production", "Viết báo cáo app và roadmap tiếp theo"],
  channel: ["Chọn niche, audience và 3 content pillar", "Tạo 20 ý tưởng, 5 hook và chọn 5 ý tưởng tốt nhất", "Viết script và quay video", "Quay video tiếp theo", "Edit video có caption và B-roll", "Tạo thumbnail và asset đăng bài", "Publish và xem analytics", "Nghiên cứu chủ đề khán giả quan tâm", "Viết script tiếp theo", "Quay video tiếp theo", "Edit và đóng gói video", "Publish và ghi baseline analytics", "Phân tích views, retention, engagement", "Review format trong tuần", "Nghiên cứu format có kết quả tốt nhất", "Viết script theo winning format", "Quay video theo winning format", "Edit video theo winning format", "Publish và theo dõi performance", "Phân tích retention và subscriber gain", "Nhân rộng tín hiệu tốt nhất", "Nghiên cứu góc mới cho content pillar thắng", "Viết script tiếp theo", "Quay video tiếp theo", "Edit video tiếp theo", "Publish và theo dõi performance", "Phân tích kết quả và quyết định nội dung lặp lại", "Viết báo cáo winning format"],
  jobs: ["Audit CV, GitHub, LinkedIn và portfolio", "Tìm công ty mục tiêu và gửi 2 application", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Review funnel tuyển dụng", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Chuẩn bị phỏng vấn technical và behavioral", "Gửi 2 application có chọn lọc", "Networking và outreach", "Review funnel tuyển dụng", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Ôn technical interview", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Chuẩn bị phỏng vấn", "Review funnel tuyển dụng", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Ôn technical interview", "Gửi 2 application có chọn lọc", "Gửi 2 application có chọn lọc", "Chuẩn bị phỏng vấn", "Review funnel cuối sprint và lập pipeline tiếp theo"]
};
const reviewTask = { track: "review", label: "ÔN LẠI", title: "Tổng kết ngày, ghi năng lượng, điểm tập trung và chọn ưu tiên ngày mai", docs: "Mẫu review ngày: năng lượng, tập trung, thành quả lớn nhất, blocker và ưu tiên ngày mai", output: "Một bản review có số liệu, thành quả, blocker và một điều chỉnh cụ thể cho ngày mai", minutes: 30, priority: "P1" };
function taskDocsFor(track, day) {
  if (track === "se") return day <= 7 ? "Linux Journey (Basics, Shell, Processes); man intro, man hier, man bash, man proc, Pro Git" : day <= 14 ? "roadmap.sh Backend; MDN HTTP; PostgreSQL Official Docs; FastAPI Docs; Redis/RabbitMQ Tutorials" : day <= 21 ? "Docker Docs; Docker Compose Docs; GitHub Actions Docs; AWS Docs; Kubernetes Basics" : "System Design Primer; OWASP Top 10; OpenTelemetry Docs; Prometheus Concepts";
  if (track === "ai") return day <= 7 ? "D2L Ch.2–4; NumPy/PyTorch Docs; notebook và loss curve" : day <= 14 ? "D2L Ch.5–7 và Ch.11; PyTorch Docs; experiment log" : day <= 21 ? "D2L Ch.10; attention/Transformer notes; PyTorch implementation" : "D2L Ch.14; tokenizer/LLM notes; RAG evaluation checklist";
  if (track === "ielts") return day % 7 === 0 ? "Cambridge IELTS full mock + IELTS Band Descriptors + bảng phân tích lỗi" : day <= 7 ? "Cambridge IELTS sample test; IELTS Liz; Cambridge Dictionary; YouGlish" : "Cambridge IELTS practice set; IELTS Liz Writing/Speaking; Band Descriptors; error log";
  if (track === "app") return day <= 7 ? "README, architecture map, issue tracker, bug triage và smoke-test checklist" : day <= 14 ? "Release checklist, Google Play Console, privacy/signing docs, analytics setup" : "Product analytics, user feedback log, retention/funnel worksheet và growth experiment template";
  if (track === "channel") return day <= 7 ? "Audience map, niche worksheet, hook library, shot list, editing/publishing checklist" : "Nền tảng analytics, retention report, content experiment log và winning-format worksheet";
  return day <= 7 ? "CV/GitHub/LinkedIn checklist, target-company sheet, application tracker, outreach template" : "Application tracker, STAR framework, technical interview bank, networking và funnel review sheet";
}
const dayTopics = ["Foundation", "Systems & fundamentals", "Implementation", "Debugging & delivery"];
const DEFAULT = {
  start: "2026-09-07", selectedDay: 1, completed: {}, minutes: {}, evidence: {},
  outcomesByDay: {}, users: 18, subs: 146, interviews: 0, appStatus: "AUDIT",
  videoCount: 0, applications: 6, responses: 2, screenings: 1, offers: 0,
  ieltsBands: { listening: 0, reading: 0, writing: 0, speaking: 0, overall: 0 },
  reviews: { daily: {}, weekly: {} },
  settings: { wake: "06:30", sleep: "23:30", workBlock: "90", break: "30" },
  targets: { se: 60, ai: 60, ielts: 112, app: 100, channel: 1000, jobs: 2 },
  weights: { se: 15, ai: 15, ielts: 25, app: 15, channel: 15, jobs: 10 },
  schedule: {}, taskEdits: {}, geminiKey: ""
};
const clone = value => JSON.parse(JSON.stringify(value));
function safeLoad() {
  try {
    const raw = localStorage.getItem("sprint28");
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return clone(DEFAULT);
    const s = { ...clone(DEFAULT), ...parsed };
    if (!parsed.schemaVersion && parsed.settings && parsed.settings.sleep === "00:30") s.settings.sleep = DEFAULT.settings.sleep;
    ["completed", "minutes", "evidence", "outcomesByDay", "reviews", "taskEdits"].forEach(k => {
      if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = clone(DEFAULT[k]);
    });
    s.settings = { ...DEFAULT.settings, ...(s.settings && typeof s.settings === "object" ? s.settings : {}) };
    s.ieltsBands = { ...DEFAULT.ieltsBands, ...(s.ieltsBands && typeof s.ieltsBands === "object" ? s.ieltsBands : {}) };
    s.targets = { ...DEFAULT.targets, ...(s.targets && typeof s.targets === "object" ? s.targets : {}) };
    s.weights = { ...DEFAULT.weights, ...(s.weights && typeof s.weights === "object" ? s.weights : {}) };
    s.selectedDay = Math.max(1, Math.min(28, Number(s.selectedDay) || 1));
    s.start = /^\d{4}-\d{2}-\d{2}$/.test(s.start) ? s.start : DEFAULT.start;
    ["users", "subs", "interviews", "videoCount", "applications", "responses", "screenings", "offers"].forEach(k => {
      s[k] = Math.max(0, Number(s[k]) || 0);
    });
    s.schemaVersion = 2;
    return s;
  } catch (_) { return clone(DEFAULT); }
}
let saved = safeLoad();
const key = (d, t) => `${Number(d)}-${t}`;
const validKey = (k, t) => new RegExp(`^([1-9]|1[0-9]|2[0-8])-${t}$`).test(k);
function persist() { try { localStorage.setItem("sprint28", JSON.stringify(saved)); } catch (_) { /* private mode */ } }
function dateForDay(d) { const date = new Date(`${saved.start}T00:00:00`); date.setDate(date.getDate() + Number(d) - 1); return date; }
function isoDate(date) { return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-"); }
function sprintDay(date = new Date()) {
  const start = new Date(`${saved.start}T00:00:00`);
  return Math.floor((new Date(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000) + 1;
}
function dateLabel(d, long = false) { return dateForDay(d).toLocaleDateString("en-US", { weekday: long ? "long" : "short", month: "long", day: "2-digit", year: "numeric" }); }
function endDate() { return isoDate(dateForDay(28)); }
function dayData(d) {
  const day = Math.max(1, Math.min(28, Number(d) || 1)); const week = Math.ceil(day / 7);
  const minutes = { se: 150, ai: 150, ielts: 240, app: 120, channel: 60, jobs: 60 };
  const tasks = Object.keys(tracks).map(t => {
    const custom = saved.taskEdits?.[day]?.[t] || {};
    return {
      track: t,
      title: custom.title || masterTaskVi[t][day - 1],
      docs: custom.docs || taskDocsFor(t, day),
      output: custom.output || `Kết quả cần có: hoàn thành task, lưu artifact/ghi chú hoặc số liệu kiểm chứng cho Day ${String(day).padStart(2, "0")}`,
      minutes: minutes[t],
      priority: day % 7 === 1 || day >= 25 ? "P0" : day % 7 <= 3 ? "P1" : "P2"
    };
  });
  const review = { ...reviewTask, title: `${reviewTask.title} · Day ${String(day).padStart(2, "0")}`, output: `${reviewTask.output} · day-${String(day).padStart(2, "0")}` };
  return { d: day, week, idx: day - 1, date: dateForDay(day), weekday: dateLabel(day), tasks: [...tasks, review] };
}
function allTasks() { return 28 * (Object.keys(tracks).length + 1); }
function completedCount() { return Object.keys(saved.completed).filter(k => saved.completed[k] && /^([1-9]|1[0-9]|2[0-8])-(se|ai|ielts|app|channel|jobs|review)$/.test(k)).length; }
function minsFor(t, d = null) {
  return Object.keys(saved.minutes).filter(k => validKey(k, t) && (d === null || Number(k.split("-")[0]) === d)).reduce((n, k) => n + Math.max(0, Number(saved.minutes[k]) || 0), 0);
}
function outcomeValue(t) { return t === "app" ? saved.users : t === "channel" ? saved.subs : t === "jobs" ? saved.interviews : Math.round(minsFor(t) / 60 * 10) / 10; }
function trackProgress(t) {
  const target = Number(saved.targets[t]) || tracks[t].target;
  return Math.min(100, Math.round((t === "app" || t === "channel" || t === "jobs" ? outcomeValue(t) / target : minsFor(t) / (target * 60)) * 100));
}
function reviewForDay(d) { return saved.reviews.daily[d] || {}; }
function trackDayScore(t, d) {
  if (t === "se" || t === "ai" || t === "ielts") return Math.min(100, Math.round(minsFor(t, d) / dayData(d).tasks.find(x => x.track === t).minutes * 100));
  const recorded = saved.outcomesByDay[d] && saved.outcomesByDay[d][t];
  return recorded === undefined ? (saved.completed[key(d, t)] ? 100 : 0) : Math.min(100, Math.max(0, Number(recorded) || 0));
}
function dayScore(d) {
  const weightTotal = Object.values(saved.weights).reduce((n, value) => n + Math.max(0, Number(value) || 0), 0) || 1;
  const base = Object.keys(saved.weights).reduce((n, t) => n + trackDayScore(t, d) * (Math.max(0, Number(saved.weights[t]) || 0) / weightTotal) * 95 / 100, 0);
  const review = reviewForDay(d); const reviewScore = review.energy && review.focus ? ((Number(review.energy) + Number(review.focus)) / 20) * 5 : 0;
  return Math.round(Math.min(100, base + reviewScore));
}
function overallPercent() { return Math.round(Object.keys(tracks).reduce((n, t) => n + trackProgress(t), 0) / Object.keys(tracks).length); }
function statusFor(p, day = saved.selectedDay) {
  const expected = Math.min(100, Math.max(0, Number(day) / 28 * 100));
  return p >= expected + 10 ? "AHEAD" : p >= expected - 10 ? "ON TRACK" : p >= expected - 25 ? "AT RISK" : "BEHIND";
}
function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0) + "k" : n; }
function showToast(text) { const el = document.querySelector("#toast"); if (!el) return; el.textContent = text; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 2200); }
function saveAndRender(message = "Saved to your sprint") { persist(); render(); showToast(message); }
function goalsHtml() {
  return Object.entries(tracks).map(([t, x]) => {
    const actual = outcomeValue(t), target = Number(saved.targets[t]) || x.target, pct = trackProgress(t), st = statusFor(pct);
    return `<div class="goal"><div><div class="goal-name"><span class="track-dot ${t}"></span>${x.label}</div><div class="goal-target">TARGET · ${fmt(target)} ${x.unit}</div></div><div><div class="bar ${x.color}"><i style="width:${pct}%"></i></div><div class="goal-meta"><b>${fmt(actual)} <small>/ ${fmt(target)}</small></b><span>${pct}%</span></div></div><div class="goal-status ${st === "AT RISK" || st === "BEHIND" ? "warn" : st === "AHEAD" ? "ahead" : ""}">${st}</div></div>`;
  }).join("");
}
function taskHtml(t, d = saved.selectedDay) {
  const done = !!saved.completed[key(d, t.track)]; const evidence = saved.evidence[key(d, t.track)] || "";
  const meta = tracks[t.track] || { label: "Daily review", short: "REVIEW" };
  return `<div class="task-line ${done ? "done" : ""}"><button class="check ${done ? "done" : ""}" data-task="${t.track}">${done ? "✓" : ""}</button><div class="task-text"><div class="task-title-row"><span class="task-name">${t.title}</span><span class="task-time">${t.minutes} phút</span></div><div class="task-track"><span class="track-dot ${t.track}"></span>${meta.label}</div><div class="task-docs">Tài liệu: ${t.docs || "Mẫu review ngày"}</div><div class="task-output">Kết quả cần nộp: ${t.output}</div><input class="input evidence-input" data-evidence="${t.track}" value="${evidence}" placeholder="Ghi evidence hoặc ghi chú (không bắt buộc)"></div></div>`;
}
function trackCards() {
  return Object.entries(tracks).map(([t, x]) => {
    const count = Object.keys(saved.completed).filter(k => validKey(k, t) && saved.completed[k]).length, p = trackProgress(t);
    return `<div class="track-card"><div class="track-head"><span class="track-dot ${t}"></span>${x.short}<span style="margin-left:auto;color:var(--faint)">${x.icon}</span></div><div class="track-hours">${fmt(outcomeValue(t))} <small>${x.unit}</small></div><div class="bar ${x.color}"><i style="width:${p}%"></i></div><div class="track-foot"><span>${p}% outcome pace</span><span>${count} outputs</span></div></div>`;
  }).join("");
}
function timeline(d = saved.selectedDay) {
  const start = saved.settings.wake || "06:30"; const [h, m] = start.split(":").map(Number); let cursor = (h * 60 + (m || 0)) % 1440;
  return dayData(d).tasks.map(t => { const hh = String(Math.floor(cursor / 60) % 24).padStart(2, "0"), mm = String(cursor % 60).padStart(2, "0"); const meta = tracks[t.track] || { short: "ÔN LẠI" }; cursor += t.minutes + Number(saved.settings.break || 30); return `<div class="timeline"><div class="timeline-hour">${hh}:${mm}</div><div class="timeline-entry ${t.track}"><b>${meta.short} · ${t.title}</b><small>Tài liệu: ${t.docs || "Mẫu review ngày"}</small><small>${t.minutes} phút · mức ${t.priority}</small></div></div>`; }).join("");
}
function dashboard() {
  const d = saved.selectedDay, p = overallPercent(), status = statusFor(p), date = dateLabel(d, true);
  return `<div class="view"><div class="hero"><div><div class="eyebrow">${date.toUpperCase()} · ${dayData(d).weekday.toUpperCase()}</div><h1>Good morning, Phương Anh.</h1><p>Six workstreams. One focused sprint. Keep the inputs honest.</p></div><div class="hero-right"><div class="date">DAY ${String(d).padStart(2, "0")} OF 28 · ${date}</div><span class="status-pill ${status === "AT RISK" ? "status-risk" : status === "BEHIND" ? "status-behind" : status === "AHEAD" ? "status-ahead" : ""}">${status}</span></div></div><div class="metric-row"><div class="metric"><div class="metric-top"><span>SPRINT PROGRESS</span><span class="metric-icon">◒</span></div><div class="metric-value">${p}<small>%</small></div><div class="metric-foot"><span class="up">↑ ${completedCount()}</span> completed outputs</div></div><div class="metric"><div class="metric-top"><span>TODAY'S SCORE</span><span class="metric-icon">✦</span></div><div class="metric-value">${dayScore(d)}<small> / 100</small></div><div class="metric-foot">${dayScore(d) >= 70 ? '<span class="up">On pace</span>' : '<span class="down">Needs attention</span>'}</div></div><div class="metric"><div class="metric-top"><span>FOCUSED HOURS</span><span class="metric-icon">◷</span></div><div class="metric-value">${Math.round(Object.values(saved.minutes).reduce((a, b) => a + Number(b || 0), 0) / 60 * 10) / 10}<small> h</small></div><div class="metric-foot">Logged minutes · target <span class="up">~320 h</span></div></div><div class="metric"><div class="metric-top"><span>SPRINT DAY</span><span class="metric-icon">↗</span></div><div class="metric-value">${d}<small> / 28</small></div><div class="metric-foot">${dayData(d).weekday} · ends ${endDate()}</div></div></div><div class="grid-2"><section class="card goals-card"><div class="card-head"><div><div class="card-title">North star goals</div><div class="card-sub">Logged minutes and actual outcomes against targets</div></div><button class="link-btn" data-view="analytics">View analytics ↗</button></div>${goalsHtml()}</section><section class="card today-card"><div class="card-head"><div><div class="card-title">Today · Day ${String(d).padStart(2, "0")}</div><div class="card-sub">${dayData(d).weekday} · ${dayTopics[dayData(d).week - 1]}</div></div><div class="day-switch"><button data-day="-1">‹</button><button data-day="1">›</button></div></div>${dayData(d).tasks.slice(0, 5).map(t => taskHtml(t)).join("")}<button class="link-btn" style="margin-top:12px" data-view="today">View all tasks ↗</button></section></div><div class="section-title">Parallel execution · outcome KPIs</div><div class="track-grid">${trackCards()}</div><div class="bottom-grid"><section class="card"><div class="card-head"><div><div class="card-title">Today's schedule</div><div class="card-sub">Dynamic blocks · protect the sleep window</div></div><button class="link-btn" data-view="settings">Edit schedule</button></div>${timeline()}</section><section class="card"><div class="card-head"><div><div class="card-title">Sprint signal</div><div class="card-sub">The one thing to protect today</div></div><span class="badge">${dayData(d).tasks[0].priority} PRIORITY</span></div><div class="callout"><b>Start with evidence.</b><br/>Log actual minutes and outcomes; then adapt the next day rather than repeating a generic week.</div><div class="stat-list"><div class="stat-line"><span>Outputs completed</span><b>${completedCount()} / ${allTasks()}</b></div><div class="stat-line"><span>Applications → interviews</span><b>${saved.applications} → ${saved.interviews}</b></div><div class="stat-line"><span>Channel subscribers</span><b>${fmt(saved.subs)} / 1,000</b></div></div></section></div></div>`;
}
function today() {
  const d = saved.selectedDay; const review = reviewForDay(d);
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">EXECUTION LOG · ${dayData(d).weekday.toUpperCase()}</div><h1>Today · Day ${String(d).padStart(2, "0")}</h1><p>Check off only when the measurable output exists. Sprint date: ${isoDate(dayData(d).date)}.</p></div><div><span class="status-pill ${dayScore(d) < 60 ? "status-risk" : ""}">${dayScore(d)} / 100</span></div></div><div class="card"><div class="card-head"><div><div class="card-title">Seven execution groups</div><div class="card-sub">Every task now shows the time block, docs, output, and evidence note in one place.</div></div><div class="day-switch"><button data-day="-1">‹</button><span class="eyebrow">DAY ${d} / 28</span><button data-day="1">›</button></div></div>${dayData(d).tasks.map(t => { const done = !!saved.completed[key(d, t.track)], min = saved.minutes[key(d, t.track)] || "", meta = tracks[t.track] || { label: "Daily review" }; return `<div class="task-line ${done ? "done" : ""}" style="grid-template-columns:20px 72px 1fr 88px 72px"><button class="check ${done ? "done" : ""}" data-task="${t.track}">${done ? "✓" : ""}</button><span class="badge ${t.priority === "P0" ? "warn" : ""}">${t.priority}</span><div class="task-text"><div class="task-title-row"><span class="task-name">${t.title}</span><span class="task-time">EST. ${t.minutes}m</span></div><div class="task-track"><span class="track-dot ${t.track}"></span>${meta.label}</div><div class="task-docs">${t.docs}</div><div class="task-output">Output · ${t.output}</div><input class="input evidence-input" data-evidence="${t.track}" value="${saved.evidence[key(d, t.track)] || ""}" placeholder="Evidence / note"></div><input class="input minutes-input" data-minutes="${t.track}" value="${min}" placeholder="Actual min" type="number" min="0"><span class="task-time">EST. ${t.minutes}m</span></div>`; }).join("")}</div><div class="bottom-grid"><section class="card"><div class="card-head"><div><div class="card-title">Daily review · Day ${d}</div><div class="card-sub">Persisted for every day; review adds the normalized 5-point score.</div></div><span class="badge blue">5 POINTS</span></div><div class="form-grid"><div class="form-field"><label>ENERGY / 10</label><input class="input review-input" data-review="energy" type="number" min="1" max="10" value="${review.energy || ""}" placeholder="8"></div><div class="form-field"><label>FOCUS / 10</label><input class="input review-input" data-review="focus" type="number" min="1" max="10" value="${review.focus || ""}" placeholder="7"></div><div class="form-field full"><label>BIGGEST WIN</label><textarea class="textarea review-input" data-review="win" placeholder="What moved a goal forward?">${review.win || ""}</textarea></div><div class="form-field full"><label>WHAT SHOULD CHANGE TOMORROW?</label><textarea class="textarea review-input" data-review="change" placeholder="One concrete adjustment">${review.change || ""}</textarea></div></div><button class="settings-save" data-save-review>Save review</button></section><section class="card"><div class="card-head"><div><div class="card-title">Schedule guardrails</div><div class="card-sub">A sustainable default, not a mandate.</div></div></div>${timeline(d)}<div class="callout"><b>Sleep window:</b> ${saved.settings.sleep} → ${saved.settings.wake} (${sleepHours()}h). If the plan slips, reduce scope before reducing sleep.</div></section></div></div>`;
}
function sleepHours() { const [sh, sm] = saved.settings.sleep.split(":").map(Number), [wh, wm] = saved.settings.wake.split(":").map(Number); return Math.round((((wh * 60 + wm) - (sh * 60 + sm) + 1440) % 1440) / 60 * 10) / 10; }
function calendar() {
  const offset = (dateForDay(1).getDay() + 6) % 7;
  const emptyCells = Array.from({ length: offset }, () => '<div class="cal-day muted" aria-hidden="true"></div>').join("");
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">ROADMAP · ${saved.start} → ${endDate()}</div><h1>28-day calendar</h1><p>Every day has seven distinct records, including REVIEW. Weekdays are derived from the sprint start date.</p></div><button class="outline-btn" data-view="today">Open selected day ↗</button></div><div class="card"><div class="calendar-grid">${["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(x => `<div class="cal-head">${x}</div>`).join("")}${emptyCells}${Array.from({ length: 28 }, (_, i) => { const d = i + 1, p = dayScore(d), done = dayData(d).tasks.filter(t => saved.completed[key(d, t.track)]).length; return `<div class="cal-day ${saved.selectedDay === d ? "selected" : ""}" data-select-day="${d}"><span class="cal-num">${String(d).padStart(2, "0")}</span><span class="cal-score">${p || "—"}</span><div class="cal-bars">${Object.keys(tracks).map(t => `<i class="${saved.completed[key(d, t.track)] ? "filled" : ""} ${t}"></i>`).join("")}  </div><small>${done}/7 records · ${dayData(d).weekday.slice(0, 3)}</small></div>`; }).join("")}</div></div><div class="section-title">Roadmap detail · all 28 days</div><div class="day-list">${Array.from({ length: 28 }, (_, i) => { const d = i + 1, done = dayData(d).tasks.filter(t => saved.completed[key(d, t.track)]).length; return `<div class="day-row"><span class="day-num">DAY ${String(d).padStart(2, "0")}</span><div><b>${dayTopics[Math.floor(i / 7)]} · ${dayData(d).weekday}</b><small>${dayData(d).tasks[0].title}</small></div><div class="progress-mini"><i style="width:${done / 6 * 100}%"></i></div><span class="day-score">${done}/6 · ${dayScore(d)}</span></div>`; }).join("")}</div></div>`;
}
function trackPage(t) {
  const x = tracks[t], target = Number(saved.targets[t]) || x.target, p = trackProgress(t), count = Object.keys(saved.completed).filter(k => validKey(k, t) && saved.completed[k]).length;
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">WORKSTREAM · ${x.short}</div><h1>${x.label}</h1><p>${t === "se" || t === "ai" ? "Logged minutes are the input; every session ships an artifact." : t === "ielts" ? "Editable per-skill bands and logged practice, never a proxy." : t === "channel" ? "Actual video and subscriber growth, not intentions." : t === "jobs" ? "Applications are inputs; responses, screenings, interviews, and offers are outcomes." : "Ship, test, submit, and learn from real users."}</p></div><span class="status-pill ${p < 35 ? "status-risk" : ""}">${statusFor(p)}</span></div><div class="track-page-grid"><section class="card"><div class="card-head"><div><div class="card-title">Outcome KPI</div><div class="card-sub">Actual vs target · Day ${saved.selectedDay}</div></div><span class="badge ${p < 35 ? "warn" : "blue"}">${p}%</span></div><div class="kpi-big"><strong>${fmt(outcomeValue(t))}</strong><span>/ ${fmt(target)} ${x.unit}</span></div><div class="bar ${x.color}" style="margin:18px 0 24px"><i style="width:${p}%"></i></div><div class="stat-list"><div class="stat-line"><span>Target</span><b>${fmt(target)} ${x.unit}</b></div><div class="stat-line"><span>Days remaining</span><b>${28 - saved.selectedDay}</b></div><div class="stat-line"><span>Outputs completed</span><b>${count} / 28</b></div></div></section><section class="card"><div class="card-head"><div><div class="card-title">Input pace · 28 days</div><div class="card-sub">Data from logged minutes or outcome records</div></div></div><div class="chart">${Array.from({ length: 28 }, (_, i) => `<div class="chart-col"><i style="height:${Math.max(4, trackDayScore(t, i + 1))}%"></i></div>`).join("")}</div><div class="chart-labels"><span>WEEK 01</span><span>WEEK 02</span><span>WEEK 03</span><span>WEEK 04</span></div></section></div>${t === "ielts" ? ieltsEditor() : ""}${t === "app" || t === "channel" || t === "jobs" ? outcomeEditor(t) : ""}<div class="section-title">All 28 planned records</div><div class="card"><table class="table"><thead><tr><th>DAY</th><th>ACTION</th><th>EXPECTED OUTPUT</th><th>TIME</th><th>STATUS</th></tr></thead><tbody>${Array.from({ length: 28 }, (_, i) => { const d = i + 1, task = dayData(d).tasks.find(z => z.track === t), done = saved.completed[key(d, t)]; return `<tr><td>DAY ${String(d).padStart(2, "0")} · ${dayData(d).weekday.slice(0, 3)}</td><td>${task.title}</td><td>${task.output}</td><td>${task.minutes}m</td><td><span class="badge ${done ? "" : "gray"}">${done ? "COMPLETE" : "PLANNED"}</span></td></tr>`; }).join("")}</tbody></table></div></div>`;
}
function ieltsEditor() { return `<section class="card" style="margin-top:14px"><div class="card-head"><div><div class="card-title">IELTS bands · editable evidence</div><div class="card-sub">Keep each skill and overall band current.</div></div></div><div class="form-grid">${["listening", "reading", "writing", "speaking", "overall"].map(k => `<div class="form-field"><label>${k.toUpperCase()} BAND</label><input class="input band-input" data-band="${k}" type="number" min="0" max="9" step=".5" value="${saved.ieltsBands[k] || ""}"></div>`).join("")}</div><button class="settings-save" data-save-band>Save IELTS bands</button></section>`; }
function outcomeEditor(t) {
  const fields = t === "app" ? [["appStatus", "STATUS", saved.appStatus, "text"], ["users", "USERS", saved.users, "number"], ["videoCount", "VIDEO COUNT", saved.videoCount, "number"]] : t === "channel" ? [["videoCount", "VIDEO COUNT", saved.videoCount, "number"], ["subs", "SUBSCRIBERS", saved.subs, "number"]] : [["applications", "APPLICATIONS", saved.applications, "number"], ["responses", "RESPONSES", saved.responses, "number"], ["screenings", "SCREENINGS", saved.screenings, "number"], ["interviews", "INTERVIEW INVITATIONS", saved.interviews, "number"], ["offers", "OFFERS", saved.offers, "number"]];
  return `<section class="card" style="margin-top:14px"><div class="card-head"><div><div class="card-title">Actual outcome inputs</div><div class="card-sub">Only saved evidence changes outcome progress.</div></div></div><div class="form-grid">${fields.map(f => `<div class="form-field"><label>${f[1]}</label><input class="input outcome-input" data-outcome="${f[0]}" type="${f[3]}" value="${f[2]}"></div>`).join("")}</div><button class="settings-save" data-save-outcomes>Save outcomes</button></section>`;
}
function analytics() {
  const p = overallPercent();
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">SIGNALS & TRENDS</div><h1>Analytics</h1><p>Separate logged input quality from outcome progress.</p></div><span class="status-pill ${p < 35 ? "status-risk" : ""}">${statusFor(p)}</span></div><div class="metric-row"><div class="metric"><div class="metric-top"><span>OUTCOME PROGRESS</span></div><div class="metric-value">${p}<small>%</small></div><div class="metric-foot">${completedCount()} of ${allTasks()} outputs</div></div><div class="metric"><div class="metric-top"><span>APP USERS</span></div><div class="metric-value">${saved.users}</div><div class="metric-foot">Status ${saved.appStatus} · videos ${saved.videoCount}</div></div><div class="metric"><div class="metric-top"><span>SUBSCRIBERS</span></div><div class="metric-value">${fmt(saved.subs)}</div><div class="metric-foot">Target <span class="up">1,000</span></div></div><div class="metric"><div class="metric-top"><span>INTERVIEWS</span></div><div class="metric-value">${saved.interviews}</div><div class="metric-foot">Responses ${saved.responses} · offers ${saved.offers}</div></div></div><div class="track-grid">${trackCards()}</div><div class="bottom-grid"><section class="card"><div class="card-head"><div><div class="card-title">Daily score trend · all 28 days</div><div class="card-sub">SE 15 · AI 15 · IELTS 25 · APP 15 · CHANNEL 15 · JOB 10 · REVIEW 5</div></div></div><div class="chart">${Array.from({ length: 28 }, (_, i) => `<div class="chart-col"><i style="height:${Math.max(4, dayScore(i + 1))}%"></i></div>`).join("")}</div><div class="chart-labels"><span>DAY 01</span><span>DAY 07</span><span>DAY 14</span><span>DAY 21</span><span>DAY 28</span></div></section><section class="card"><div class="card-head"><div><div class="card-title">Funnel health</div><div class="card-sub">Job pipeline · quality over volume</div></div></div><div class="stat-list"><div class="stat-line"><span>Applications</span><b>${saved.applications}</b></div><div class="stat-line"><span>Responses</span><b>${saved.responses}</b></div><div class="stat-line"><span>Screenings</span><b>${saved.screenings}</b></div><div class="stat-line"><span>Interview invitations</span><b>${saved.interviews}</b></div><div class="stat-line"><span>Offers</span><b>${saved.offers}</b></div></div><div class="callout"><b>Rule:</b> Applications are inputs; conversion outcomes are the signal.</div></section></div></div>`;
}
function reviews() {
  const week = Math.ceil(saved.selectedDay / 7), start = (week - 1) * 7 + 1, days = Array.from({ length: 7 }, (_, i) => start + i), scores = days.map(dayScore), avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length), review = saved.reviews.weekly[week] || {};
  const final = saved.selectedDay === 28 ? `<div class="section-title">Final 28-day report</div><section class="card"><table class="table"><thead><tr><th>GOAL</th><th>TARGET</th><th>ACTUAL</th><th>PROGRESS</th><th>STATUS</th></tr></thead><tbody>${Object.entries(tracks).map(([t, x]) => `<tr><td>${x.label}</td><td>${fmt(saved.targets[t])} ${x.unit}</td><td>${fmt(outcomeValue(t))}</td><td>${trackProgress(t)}%</td><td><span class="badge ${trackProgress(t) >= 100 ? "" : "warn"}">${trackProgress(t) >= 100 ? "ACHIEVED" : "BEHIND"}</span></td></tr>`).join("")}</tbody></table><div class="callout"><b>Execution summary:</b> ${completedCount()} / ${allTasks()} outputs completed · ${Math.round(Object.values(saved.minutes).reduce((n, v) => n + Number(v || 0), 0) / 60 * 10) / 10} focused hours.</div></section>` : "";
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">REFLECTION LOOP · ALL WEEKS</div><h1>Reviews</h1><p>Daily and weekly reviews persist independently for every day and week.</p></div></div><div class="review-grid"><section class="card review-card"><div class="eyebrow">WEEK ${week} · DAYS ${start}–${start + 6}</div><div class="score-ring" style="background:conic-gradient(var(--green) 0 ${avg}%,#24343a ${avg}% 100%)"><div>${avg}<small style="font-size:11px">/100</small></div></div><h3>Week ${week} review</h3><p>Data-driven average · ${scores.join(" · ")}</p><div class="review-prompts"><label>WHAT IS WORKING?<textarea class="textarea weekly-input" data-weekly="working">${review.working || ""}</textarea></label><label>WHICH GOAL IS BEHIND?<textarea class="textarea weekly-input" data-weekly="behind">${review.behind || ""}</textarea></label><label>WHAT WILL CHANGE NEXT WEEK?<textarea class="textarea weekly-input" data-weekly="change">${review.change || ""}</textarea></label></div><button class="settings-save" data-save-weekly>Save week ${week} review</button></section><section class="card"><div class="card-head"><div><div class="card-title">Daily review log · 28 days</div><div class="card-sub">Every day remains visible, even before it is closed.</div></div></div><table class="table"><thead><tr><th>DAY</th><th>SCORE</th><th>STATUS</th><th>OUTPUTS</th><th>REVIEW</th></tr></thead><tbody>${Array.from({ length: 28 }, (_, i) => { const d = i + 1, r = reviewForDay(d); return `<tr><td>DAY ${String(d).padStart(2, "0")}</td><td>${dayScore(d)} / 100</td><td><span class="badge ${dayScore(d) > 69 ? "" : "warn"}">${dayScore(d) > 69 ? "ON TRACK" : "OPEN"}</span></td><td>${dayData(d).tasks.filter(t => saved.completed[key(d, t.track)]).length} / 6</td><td>${r.win ? "SAVED" : "OPEN"}</td></tr>`; }).join("")}</tbody></table><div class="callout"><b>Scoring weights:</b> SE 15 · AI 15 · IELTS 25 · APP 15 · CHANNEL 15 · JOB 10 · REVIEW 5.</div></section></div>${final}</div>`;
}
function settings() {
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">SYSTEM CONFIGURATION</div><h1>Settings</h1><p>Change the plan when evidence changes. Protect approximately seven hours of sleep first.</p></div></div><div class="settings-grid"><section class="card"><div class="card-head"><div><div class="card-title">Sprint window</div><div class="card-sub">28 days · ${saved.start} → ${endDate()} · ends on ${dateLabel(28)}</div></div></div><div class="form-grid"><div class="form-field"><label>START DATE</label><input class="input setting" data-setting="start" type="date" value="${saved.start}"></div><div class="form-field"><label>SPRINT LENGTH</label><input class="input" value="28 days" disabled></div></div></section><section class="card"><div class="card-head"><div><div class="card-title">Daily schedule</div><div class="card-sub">Default sleep: ${sleepHours()}h. Settings are staged until Save configuration.</div></div></div><div class="form-grid">${[["wake", "WAKE TIME"], ["sleep", "SLEEP TIME"], ["workBlock", "WORK BLOCK (MIN)"], ["break", "BREAK (MIN)"]].map(x => `<div class="form-field"><label>${x[1]}</label><input class="input setting" data-setting="${x[0]}" value="${saved.settings[x[0]]}"></div>`).join("")}</div></section><section class="card"><div class="card-head"><div><div class="card-title">Live outcome inputs</div><div class="card-sub">Update actuals as the sprint produces evidence.</div></div></div><div class="form-grid">${[["appStatus", "APP STATUS", saved.appStatus, "text"], ["users", "APP USERS", saved.users, "number"], ["videoCount", "VIDEO COUNT", saved.videoCount, "number"], ["subs", "CHANNEL SUBSCRIBERS", saved.subs, "number"], ["applications", "APPLICATIONS", saved.applications, "number"], ["responses", "RESPONSES", saved.responses, "number"], ["screenings", "SCREENINGS", saved.screenings, "number"], ["interviews", "INTERVIEW INVITATIONS", saved.interviews, "number"], ["offers", "OFFERS", saved.offers, "number"]].map(x => `<div class="form-field"><label>${x[1]}</label><input class="input outcome-input" data-outcome="${x[0]}" type="${x[3]}" min="0" value="${x[2]}"></div>`).join("")}</div><button class="settings-save" data-save-settings>Save configuration</button></section><section class="card"><div class="card-head"><div><div class="card-title">Targets & scoring</div><div class="card-sub">Adjust outcome targets and daily score weights.</div></div></div><div class="form-grid">${Object.keys(tracks).map(t => `<div class="form-field"><label>${tracks[t].short} TARGET (${tracks[t].unit})</label><input class="input target-input" data-target="${t}" type="number" min="0" value="${saved.targets[t]}"></div>`).join("")}${Object.keys(tracks).map(t => `<div class="form-field"><label>${tracks[t].short} WEIGHT</label><input class="input weight-input" data-weight="${t}" type="number" min="0" max="100" value="${saved.weights[t]}"></div>`).join("")}</div><button class="settings-save" data-save-settings>Save targets & scoring</button></section><section class="card"><div class="card-head"><div><div class="card-title">Gemini AI Assistant</div><div class="card-sub">Add your Gemini API key to get AI schedule suggestions.</div></div></div><div class="form-grid"><div class="form-field"><label>GEMINI API KEY</label><input class="input setting" data-setting="geminiKey" type="password" value="${saved.geminiKey}"></div></div><button class="settings-save" data-save-settings>Save Gemini key</button></section><section class="card"><div class="card-head"><div><div class="card-title">Product rules</div><div class="card-sub">Non-negotiables encoded in the tracker.</div></div></div><div class="stat-list"><div class="stat-line"><span>Technical tracks</span><b>SE + AI in parallel</b></div><div class="stat-line"><span>IELTS baseline</span><b>Actual diagnostic only</b></div><div class="stat-line"><span>App / channel</span><b>Status + users + videos</b></div><div class="stat-line"><span>Job funnel</span><b>Responses → screenings → offers</b></div><div class="stat-line"><span>Sleep protection</span><b>Enabled</b></div></div></section></div></div>`;
}
function schedule() {
  const d = saved.selectedDay;
  const dayTasks = dayData(d).tasks;
  const rawSchedule = saved.schedule[d] || ScheduleEngine.generateDaySchedule(d, dayTasks, saved.settings);
  const daySchedule = rawSchedule.map(task => {
    const base = dayTasks.find(item => item.track === task.track) || task;
    const custom = saved.taskEdits?.[d]?.[task.track] || {};
    return { ...base, ...task, title: custom.title || base.title, docs: custom.docs || base.docs, output: custom.output || base.output };
  });
  const suggestions = ScheduleEngine.suggestOptimization(daySchedule, d);
  const totalDuration = ScheduleEngine.getTotalDuration(daySchedule);
  const lastTask = daySchedule[daySchedule.length - 1];
  const endTime = lastTask ? lastTask.endTime : saved.settings.sleep;
  
  return `<div class="view"><div class="page-heading"><div><div class="eyebrow">DAILY EXECUTION</div><h1>Schedule – Day ${d}</h1><p>Sửa giờ bắt đầu hoặc thời lượng ngay trên từng dòng. Timeline sẽ tự dời các task phía sau để giữ nhịp ngày.</p></div><div class="day-switch"><button data-prev-schedule>‹</button><span>${dateLabel(d)}</span><button data-next-schedule>›</button></div></div><div class="schedule-header"><h2>${dateLabel(d)}</h2><div class="schedule-controls"><button data-ai-optimize>🤖 AI Optimize</button><button data-reset-schedule>↻ Reset</button></div></div><div class="schedule-toolbar"><div class="schedule-pill">Wake ${saved.settings.wake || "06:30"}</div><div class="schedule-pill">Break ${saved.settings.break || 30}m</div><div class="schedule-pill">End ${endTime}</div><span class="draggable-hint">Drag rows to reorder. Edit start time or duration để cập nhật timeline.</span></div>${suggestions.length > 0 ? `<div class="ai-suggestions"><div class="ai-suggestions-title"><span class="ai-icon">💡</span>AI Suggestions</div>${suggestions.map(s => `<div class="suggestion-item"><div class="suggestion-type">${s.type}</div><div class="suggestion-msg">${s.message}</div><div class="suggestion-rec">${s.recommendation}</div></div>`).join("")}</div>` : ""}<table class="schedule-table"><thead><tr><th>START</th><th>TASK</th><th>DOCS</th><th style="width:86px">PRIORITY</th><th style="width:110px">DURATION</th><th style="width:64px">✓</th></tr></thead><tbody>${daySchedule.map((task, i) => `<tr class="task-row" draggable="true" data-task-index="${i}"><td class="time-cell"><input class="input schedule-input" data-schedule-start="${i}" type="time" value="${task.startTime}"><span class="time-range">${task.startTime} — ${task.endTime}</span></td><td class="task-cell"><div class="task-title">${task.title}</div><div class="task-output">${task.output}</div></td><td class="task-doc-cell">${task.docs || ""}</td><td><span class="priority-badge ${task.priority.toLowerCase()}">${task.priority}</span></td><td class="duration-cell"><input class="input schedule-input duration-input" data-schedule-minutes="${i}" type="number" min="15" step="5" value="${task.minutes}"><span>${task.minutes}m</span></td><td class="status-cell"><input type="checkbox" class="check inline" ${saved.completed[key(d, task.track)] ? "checked" : ""} data-task-complete="${key(d, task.track)}"></td></tr>`).join("")}</tbody></table><div class="total-time"><span>Total time on tasks:</span><span class="total-time-value">${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m</span></div><div class="schedule-footer"><p><strong>Gợi ý sử dụng:</strong></p><ul><li>Kéo dòng để đổi thứ tự ưu tiên.</li><li>Chỉnh START hoặc DURATION để timeline tự tính lại phần còn lại.</li><li>P0 nên ở đầu buổi sáng để tận dụng năng lượng tốt nhất.</li><li>Nhấn AI Optimize nếu muốn nhận gợi ý sắp xếp lại.</li><li>Tick task khi đã xong output thực tế.</li></ul></div></div>`;
}
const views = { dashboard, today, schedule, calendar, analytics, reviews, settings, se: () => trackPage("se"), ai: () => trackPage("ai"), ielts: () => trackPage("ielts"), app: () => trackPage("app"), channel: () => trackPage("channel"), jobs: () => trackPage("jobs") };
function headerTitle(view) { return ({ dashboard: "Tổng quan", calendar: "Lịch 28 ngày", today: "Hôm nay", schedule: "Lịch làm việc", se: "Software Engineering", ai: "Artificial Intelligence", ielts: "IELTS", app: "Phát hành App", channel: "Kênh cá nhân", jobs: "Tìm việc", analytics: "Phân tích", reviews: "Tổng kết", settings: "Cài đặt" })[view] || "Tổng quan"; }
function localizeHtml(html) {
  const labels = {
    "Good morning, Alex.": "Chào buổi sáng, Phương Anh.", "Six workstreams. One focused sprint. Keep the inputs honest.": "Sáu mảng mục tiêu trong một sprint tập trung. Hãy ghi số liệu thực tế.",
    "SPRINT PROGRESS": "TIẾN ĐỘ SPRINT", "TODAY'S SCORE": "ĐIỂM HÔM NAY", "FOCUSED HOURS": "GIỜ TẬP TRUNG", "SPRINT DAY": "NGÀY SPRINT",
    "completed outputs": "đầu ra đã hoàn thành", "On pace": "Đúng tiến độ", "Needs attention": "Cần chú ý", "Logged minutes": "Số phút đã ghi", "North star goals": "Mục tiêu chính", "View analytics ↗": "Xem phân tích ↗", "Today's schedule": "Lịch hôm nay", "Edit schedule": "Sửa lịch", "Sprint signal": "Tín hiệu sprint", "Outputs completed": "Đầu ra đã hoàn thành", "Applications → interviews": "Hồ sơ → phỏng vấn", "Channel subscribers": "Người đăng ký kênh",
    "EXECUTION LOG": "NHẬT KÝ THỰC HIỆN", "Check off only when the measurable output exists.": "Chỉ đánh dấu khi đã có đầu ra kiểm chứng được.", "Seven execution groups": "Bảy nhóm việc mỗi ngày", "Every task now shows the time block, docs, output, and evidence note in one place.": "Mỗi task có giờ làm, tài liệu, kết quả cần nộp và nơi ghi evidence.", "Daily review": "Tổng kết ngày", "Save review": "Lưu tổng kết", "WHAT SHOULD CHANGE TOMORROW?": "NGÀY MAI CẦN THAY ĐỔI GÌ?", "BIGGEST WIN": "THÀNH QUẢ LỚN NHẤT", "ENERGY / 10": "NĂNG LƯỢNG / 10", "FOCUS / 10": "TẬP TRUNG / 10", "Schedule guardrails": "Nguyên tắc giữ lịch", "Sleep window": "Khung giờ ngủ",
    "28-day calendar": "Lịch 28 ngày", "Every day has seven distinct records, including REVIEW.": "Mỗi ngày có bảy bản ghi riêng, bao gồm phần ÔN LẠI.", "Open selected day ↗": "Mở ngày đang chọn ↗", "Roadmap detail · all 28 days": "Chi tiết lộ trình · đủ 28 ngày", "All 28 planned records": "Toàn bộ 28 ngày đã lên kế hoạch",
    "Outcome KPI": "KPI kết quả", "Input pace · 28 days": "Nhịp thực hiện · 28 ngày", "Actual vs target": "Thực tế so với mục tiêu", "Days remaining": "Số ngày còn lại", "Outputs completed": "Đầu ra đã hoàn thành", "All 28 planned records": "Toàn bộ 28 ngày đã lên kế hoạch", "EXPECTED OUTPUT": "KẾT QUẢ CẦN NỘP", "STATUS": "TRẠNG THÁI", "PLANNED": "ĐÃ LÊN KẾ HOẠCH", "COMPLETE": "ĐÃ XONG",
    "DAILY EXECUTION": "THỰC HIỆN TRONG NGÀY", "AI Optimize": "AI tối ưu", "Reset": "Đặt lại", "Wake": "Thức dậy", "Break": "Nghỉ", "End": "Kết thúc", "Drag rows to reorder. Edit start time or duration để cập nhật timeline.": "Kéo dòng để đổi thứ tự. Sửa giờ bắt đầu hoặc thời lượng để cập nhật timeline.", "START": "BẮT ĐẦU", "TASK": "TASK", "DOCS": "TÀI LIỆU", "PRIORITY": "ƯU TIÊN", "DURATION": "THỜI LƯỢNG", "Total time on tasks:": "Tổng thời gian làm task:", "Gợi ý sử dụng:": "Cách sử dụng:", "Drag rows to reorder.": "Kéo dòng để đổi thứ tự.", "Edit start time or duration để cập nhật timeline.": "Sửa giờ bắt đầu hoặc thời lượng để cập nhật timeline.", "Tick task khi đã xong output thực tế.": "Đánh dấu khi đã hoàn thành kết quả thực tế.",
    "REFLECTION LOOP · ALL WEEKS": "VÒNG LẶP TỔNG KẾT · TẤT CẢ CÁC TUẦN", "Daily and weekly reviews persist independently for every day and week.": "Tổng kết ngày và tuần được lưu riêng cho từng ngày và tuần.", "Save week": "Lưu tổng kết tuần", "Daily review log · 28 days": "Nhật ký tổng kết · 28 ngày", "Funnel health": "Sức khỏe funnel tuyển dụng", "Applications": "Hồ sơ ứng tuyển", "Responses": "Phản hồi", "Screenings": "Vòng sàng lọc", "Interview invitations": "Lời mời phỏng vấn", "Offers": "Offer",
    "SYSTEM CONFIGURATION": "CẤU HÌNH HỆ THỐNG", "Change the plan when evidence changes.": "Điều chỉnh kế hoạch khi số liệu thực tế thay đổi.", "Sprint window": "Khoảng thời gian sprint", "Daily schedule": "Lịch hằng ngày", "Live outcome inputs": "Số liệu kết quả thực tế", "Targets & scoring": "Mục tiêu và cách tính điểm", "Save configuration": "Lưu cấu hình", "Save targets & scoring": "Lưu mục tiêu và điểm", "Product rules": "Nguyên tắc kế hoạch", "Sleep protection": "Bảo vệ giấc ngủ"
  };
  return Object.entries(labels).reduce((result, [from, to]) => result.split(from).join(to), html);
}
function setupScheduleEditors() {
  document.querySelectorAll(".schedule-table .task-row").forEach(row => {
    const index = Number(row.dataset.taskIndex);
    [".task-title", ".task-output", ".task-doc-cell"].forEach(selector => {
      const field = row.querySelector(selector);
      if (!field) return;
      field.contentEditable = "true";
      field.dataset.scheduleEdit = selector === ".task-title" ? "title" : selector === ".task-output" ? "output" : "docs";
      field.dataset.scheduleEditIndex = String(index);
      field.setAttribute("aria-label", `Edit ${field.dataset.scheduleEdit}`);
    });
  });
}
function render(view = "dashboard") { const active = document.querySelector(".nav-item.active"); if (active && view === "dashboard") view = active.dataset.view; document.querySelector("#page-label").textContent = headerTitle(view); document.querySelector("#view-root").innerHTML = localizeHtml((views[view] || views.dashboard)()); updateChrome(); if (view === "schedule") setupScheduleEditors(); }
function updateChrome() { const p = overallPercent(); document.querySelector("#mini-progress").style.width = `${p}%`; document.querySelector("#mini-percent").textContent = `${p}%`; document.querySelector("#mini-day").textContent = `DAY ${String(saved.selectedDay).padStart(2, "0")} / 28`; document.querySelector("#sprint-dates").textContent = `${saved.start} → ${endDate()}`; }
function readOutcome(input) { return input.type === "number" ? Math.max(0, Number(input.value) || 0) : input.value.trim(); }
function applyTimelineEdit(day, index, updates) {
  const current = saved.schedule[day] || ScheduleEngine.generateDaySchedule(day, dayData(day).tasks, saved.settings);
  saved.schedule[day] = ScheduleEngine.updateTaskAt(current, index, updates, saved.settings);
  persist();
  render("schedule");
  showToast("Đã cập nhật timeline");
}
function applyTaskEdit(day, index, updates) {
  const current = saved.schedule[day] || ScheduleEngine.generateDaySchedule(day, dayData(day).tasks, saved.settings);
  const task = current[index];
  if (!task) return;
  saved.schedule[day] = current.map((item, i) => i === index ? { ...item, ...updates } : item);
  saved.taskEdits[day] = saved.taskEdits[day] || {};
  saved.taskEdits[day][task.track] = { ...(saved.taskEdits[day][task.track] || {}), ...updates };
  persist();
  render("schedule");
  showToast("Đã cập nhật task");
}
/* One delegated listener set survives every render; this avoids accumulating
   handlers on controls that are replaced by innerHTML. */
function bindEvents() {
  document.addEventListener("click", e => {
    const nav = e.target.closest("[data-view]"); if (nav) { document.querySelectorAll(".nav-item").forEach(x => x.classList.toggle("active", x.dataset.view === nav.dataset.view)); render(nav.dataset.view); return; }
    const day = e.target.closest("[data-day]"); if (day) { saved.selectedDay = Math.max(1, Math.min(28, saved.selectedDay + Number(day.dataset.day))); persist(); render(); return; }
    const prevSched = e.target.closest("[data-prev-schedule]"); if (prevSched) { saved.selectedDay = Math.max(1, saved.selectedDay - 1); persist(); render("schedule"); return; }
    const nextSched = e.target.closest("[data-next-schedule]"); if (nextSched) { saved.selectedDay = Math.min(28, saved.selectedDay + 1); persist(); render("schedule"); return; }
    const select = e.target.closest("[data-select-day]"); if (select) { saved.selectedDay = Number(select.dataset.selectDay); document.querySelectorAll(".nav-item").forEach(x => x.classList.toggle("active", x.dataset.view === "today")); persist(); render("today"); return; }
    const task = e.target.closest("[data-task]"); if (task) { saved.completed[key(saved.selectedDay, task.dataset.task)] = !saved.completed[key(saved.selectedDay, task.dataset.task)]; saveAndRender("Đã lưu trạng thái task"); return; }
    const taskComplete = e.target.closest("[data-task-complete]"); if (taskComplete) { const k = taskComplete.dataset.taskComplete; saved.completed[k] = taskComplete.checked; persist(); showToast("Đã lưu trạng thái task"); return; }
    const resetSched = e.target.closest("[data-reset-schedule]"); if (resetSched) { delete saved.schedule[saved.selectedDay]; saveAndRender("Đã đặt lại lịch mặc định"); return; }
    const aiOptimize = e.target.closest("[data-ai-optimize]"); if (aiOptimize) { aiOptimize.disabled = true; aiOptimize.textContent = "🤖 Optimizing..."; optimizeScheduleWithAI().then(() => render("schedule")).finally(() => { aiOptimize.disabled = false; aiOptimize.textContent = "🤖 AI Optimize"; }); return; }
    if (e.target.closest("[data-save-settings]") || e.target.closest("[data-save-outcomes]")) { document.querySelectorAll("[data-setting]").forEach(i => { if (i.dataset.setting === "start") saved.start = /^\d{4}-\d{2}-\d{2}$/.test(i.value) ? i.value : saved.start; else if (i.dataset.setting === "geminiKey") { saved.geminiKey = i.value; GeminiAI.init(saved.geminiKey); } else saved.settings[i.dataset.setting] = i.value; }); document.querySelectorAll("[data-outcome]").forEach(i => saved[i.dataset.outcome] = readOutcome(i)); document.querySelectorAll("[data-target]").forEach(i => saved.targets[i.dataset.target] = Math.max(0, Number(i.value) || 0)); document.querySelectorAll("[data-weight]").forEach(i => saved.weights[i.dataset.weight] = Math.max(0, Number(i.value) || 0)); saveAndRender("Configuration saved"); return; }
    if (e.target.closest("[data-save-review]")) { saved.reviews.daily[saved.selectedDay] = Object.fromEntries([...document.querySelectorAll("[data-review]")].map(i => [i.dataset.review, i.type === "number" ? Number(i.value) : i.value])); saved.completed[key(saved.selectedDay, "review")] = true; saveAndRender("Daily review saved"); return; }
    if (e.target.closest("[data-save-weekly]")) { const week = Math.ceil(saved.selectedDay / 7); saved.reviews.weekly[week] = Object.fromEntries([...document.querySelectorAll("[data-weekly]")].map(i => [i.dataset.weekly, i.value])); saveAndRender(`Week ${week} review saved`); return; }
    if (e.target.closest("[data-save-band]")) { document.querySelectorAll("[data-band]").forEach(i => saved.ieltsBands[i.dataset.band] = Number(i.value) || 0); saveAndRender("IELTS bands saved"); }
  });
  document.addEventListener("change", e => {
    const min = e.target.closest("[data-minutes]"); if (min) { saved.minutes[key(saved.selectedDay, min.dataset.minutes)] = Math.max(0, Number(min.value) || 0); persist(); showToast("Actual time recorded"); return; }
    const evidence = e.target.closest("[data-evidence]"); if (evidence) { saved.evidence[key(saved.selectedDay, evidence.dataset.evidence)] = evidence.value; persist(); showToast("Evidence note saved"); }
    const scheduleStart = e.target.closest("[data-schedule-start]"); if (scheduleStart) { applyTimelineEdit(saved.selectedDay, Number(scheduleStart.dataset.scheduleStart), { startTime: scheduleStart.value }); return; }
    const scheduleMinutes = e.target.closest("[data-schedule-minutes]"); if (scheduleMinutes) { applyTimelineEdit(saved.selectedDay, Number(scheduleMinutes.dataset.scheduleMinutes), { minutes: scheduleMinutes.value }); return; }
    const taskTitle = e.target.closest("[data-schedule-title]"); if (taskTitle) { applyTaskEdit(saved.selectedDay, Number(taskTitle.dataset.scheduleTitle), { title: taskTitle.value }); return; }
    const taskDocs = e.target.closest("[data-schedule-docs]"); if (taskDocs) { applyTaskEdit(saved.selectedDay, Number(taskDocs.dataset.scheduleDocs), { docs: taskDocs.value }); return; }
    const taskOutput = e.target.closest("[data-schedule-output]"); if (taskOutput) { applyTaskEdit(saved.selectedDay, Number(taskOutput.dataset.scheduleOutput), { output: taskOutput.value }); return; }
  });
  document.addEventListener("focusout", e => {
    const field = e.target.closest("[data-schedule-edit]");
    if (!field) return;
    applyTaskEdit(saved.selectedDay, Number(field.dataset.scheduleEditIndex), { [field.dataset.scheduleEdit]: field.textContent.trim() });
  });
  // Drag and drop for schedule tasks
  let draggedIndex = null;
  document.addEventListener("dragstart", e => {
    const row = e.target.closest("[data-task-index]");
    if (row) { draggedIndex = Number(row.dataset.taskIndex); e.dataTransfer.effectAllowed = "move"; }
  });
  document.addEventListener("dragover", e => {
    const row = e.target.closest("[data-task-index]");
    if (row) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; row.classList.add("drag-over"); }
  });
  document.addEventListener("dragleave", e => {
    const row = e.target.closest("[data-task-index]");
    if (row) row.classList.remove("drag-over");
  });
  document.addEventListener("drop", e => {
    const row = e.target.closest("[data-task-index]");
    if (row && draggedIndex !== null) {
      e.preventDefault();
      const toIndex = Number(row.dataset.taskIndex);
      const d = saved.selectedDay;
      const dayTasks = dayData(d).tasks;
      const daySchedule = saved.schedule[d] || ScheduleEngine.generateDaySchedule(d, dayTasks, saved.settings);
      const newSchedule = ScheduleEngine.moveTask(daySchedule, draggedIndex, toIndex, saved.settings);
      saved.schedule[d] = newSchedule;
      saveAndRender("Schedule reordered");
      draggedIndex = null;
    }
  });
}
async function optimizeScheduleWithAI() {
  if (!saved.geminiKey) { showToast("⚠ Gemini API key not set. Go to Settings to add it."); return; }
  GeminiAI.init(saved.geminiKey);
  const d = saved.selectedDay;
  const dayTasks = dayData(d).tasks;
  const daySchedule = saved.schedule[d] || ScheduleEngine.generateDaySchedule(d, dayTasks, saved.settings);
  const result = await GeminiAI.suggestScheduleOptimization(d, d, daySchedule);
  if (result.error) { showToast(`❌ ${result.error}`); return; }
  showToast("💡 AI suggestions updated");
}
bindEvents();
if (saved.geminiKey) GeminiAI.init(saved.geminiKey);
document.querySelectorAll(".nav-item").forEach(x => x.classList.toggle("active", x.dataset.view === "dashboard"));
render("dashboard");
