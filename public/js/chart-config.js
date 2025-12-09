fetch('/api/best_seller_categories')
  .then((res) => res.json())
  .then((data) => {
    const categories = data.map((item) => item.category);
    const totals = data.map((item) => item.total_sold);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = document.getElementById('bestSellingChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            data: totals,
            backgroundColor: ['#7634df9b', '#7e06ced7'],
            borderRadius: 12,
            barPercentage: 0.98,
            categoryPercentage: 0.88,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          datalabels: {
            clip: false,
            labels: {
              // Total number (just above category)
              total: {
                anchor: 'start',
                align: 'start', // push inside from the bottom
                offset: -76, // move upward from bottom
                color: '#fff',
                font: { weight: 'bold', size: isMobile ? 12 : 18 },
                formatter: (value) => value,
              },
              // Category pill (at very bottom inside bar)
              category: {
                anchor: 'start',
                align: 'start',
                offset: -42, // close to bottom
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderRadius: 32,
                padding: { top: 5, bottom: 5, left: 12, right: 12 },
                textAlign: 'center',
                font: { weight: 'bold', size: isMobile ? 8 : 12.6 },
                formatter: (_val, ctx) => {
                  const label = ctx.chart.data.labels[ctx.dataIndex];
                  const maxChars = 18; // 🔑 adjust per line width
                  const words = label.split(' ');
                  let lines = [];
                  let currentLine = '';

                  words.forEach((word) => {
                    if ((currentLine + word).length > maxChars) {
                      lines.push(currentLine.trim());
                      currentLine = word + ' ';
                    } else {
                      currentLine += word + ' ';
                    }
                  });
                  if (currentLine) lines.push(currentLine.trim());

                  return lines; // returning array → Chart.js prints multi-line
                },
              },
            },
          },
        },
        scales: {
          x: {
            ticks: { display: false },
            grid: { display: false, drawBorder: false },
            border: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { display: false },
            grid: { display: false, drawBorder: false },
            border: { display: false },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  })
  .catch((err) => console.error('Error fetching categories:', err));
