// Design styles data
const designStyles = [
    {
        "name": "Cyber Neon",
        "description": "Electric retro-futuristic aesthetic featuring vibrant neon gradients in hot pink, electric blue, acid purple, and cyan that evoke VHS tape artifacts and 1980s arcade culture. The design combines glowing luminescent edges with digital distortion effects, scan lines, chromatic aberration, and holographic iridescence. Think Miami Vice meets Blade Runner—saturated color transitions that pulse with energy against pitch-black backgrounds, creating an otherworldly glow as if viewed through rain-soaked neon-lit streets. Sharp geometric frames containing soft gradient washes, with typography that feels like it's transmitted through analog signals.",
        "accentColor": "#ff0080"
    },
    {
        "name": "Liquid Design",
        "description": "Smooth, tactile 3D-rendered organic forms that appear to be molten, fluid, and constantly in motion—like thick honey, melted wax, or morphing digital clay. These amorphous shapes feature bulbous protrusions, flowing curves, and blob-like silhouettes in saturated jewel tones—think tangerine orange, cobalt blue, hot magenta, and lime green. The surfaces have a glossy, reflective quality with subtle specular highlights that suggest wetness or viscosity. Shapes melt into one another seamlessly, defying rigid structure with asymmetrical compositions that feel biomorphic and alive, as if sculpted from liquid latex that's perpetually shifting.",
        "accentColor": "#ff6600"
    },
    {
        "name": "Fashion Collage",
        "description": "Chaotic maximalist assemblage combining fragmented fashion photography with geometric cutouts, emoji-like graphics, bold text snippets, and contrasting visual elements layered with intentional recklessness. This style channels zine culture and punk aesthetics—think torn magazine clippings, mirrored symmetrical portraits, pop art color blocking, and irreverent juxtapositions. Human figures are cropped, repeated, and mirrored with kaleidoscopic effects, surrounded by jagged triangles, crown icons, rainbow gradients, and playful stickers. The composition feels energetically disorganized yet purposeful, with multiple visual layers competing for attention simultaneously, creating a sense of rebellious youth culture and digital collage art.",
        "accentColor": "#e91e63"
    },
    {
        "name": "Sketchbook",
        "description": "Raw, unpolished hand-drawn aesthetic featuring loose gestural linework, messy ink scribbles, quick pen doodles, and imperfect mark-making that celebrates authenticity over precision. The style evokes artist notebooks and spontaneous creative exploration—smudged charcoal marks, crosshatching, casual letterforms, and unfinished contour drawings. Lines are organic, wobbly, and human, with visible starts and stops that reveal the artist's hand. Typography is playful and handwritten, overlapping with sketch elements in a stream-of-consciousness visual diary format. The overall effect feels intimate, vulnerable, and deliberately anti-digital, like peeking into a designer's personal creative process.",
        "accentColor": "#424242"
    },
    {
        "name": "Sustainable Minimalism",
        "description": "Clean, breathable compositions with generous negative space in warm neutral tones—cream, beige, soft terracotta, sage green, and muted earth pigments. The design philosophy emphasizes intentional restraint with geometric simplicity, rounded corners, and organic accent colors that suggest natural materials like wood, stone, and plant life. Typography is modern sans-serif with comfortable spacing, never overcrowded. Visual elements are thoughtfully placed with clear hierarchy and purposeful breathing room, creating a sense of calm professionalism. Occasional pops of vibrant color—sunny yellow or coral pink—act as focal points against the serene neutral backdrop, suggesting sustainable brands focused on wellness, environmental consciousness, and mindful consumption.",
        "accentColor": "#8bc34a"
    },
    {
        "name": "Geometric Remix",
        "description": "Bold Bauhaus-inspired compositions featuring modular grid structures, checkerboard patterns, concentric circles, overlapping triangles, and dynamic color blocking in primary and secondary hues. This style channels 1920s constructivist posters and Swiss modernism—think precise alignment, mathematical proportions, and playful visual rhythm. Shapes intersect and layer with transparency effects, creating new color zones where they overlap. The palette is unapologetically vibrant—royal blue, fire engine red, sunshine yellow, kelly green—with occasional black and white anchoring the composition. Typography integrates into the geometric framework, often running at angles or following circular paths, with bold sans-serif letterforms that echo the architectural quality of the shapes.",
        "accentColor": "#2196f3"
    },
    {
        "name": "Rule Breaking Type",
        "description": "Experimental typography that deliberately violates traditional hierarchy and readability conventions—mixing ultra-condensed gothic fonts with delicate serifs, rotating text at chaotic angles, layering transparent letterforms, and scaling words unpredictably. This rebellious approach features deconstructed layouts where text becomes visual texture rather than purely functional communication. Letters might be stretched, warped, fragmented, or overlapped with transparency. Size relationships feel intentionally wrong—tiny headers paired with massive body copy, or critical information buried in visual noise. The style suggests glitch aesthetics, punk zines, and dadaist poetry, where meaning emerges through disruption rather than clarity.",
        "accentColor": "#9c27b0"
    },
    {
        "name": "Blur & Reveal",
        "description": "Fragmented compositions employing strategic gaussian blur, frosted glass effects, and partial reveals through organic or circular masks that create visual intrigue through selective focus. Elements appear as if viewed through steamed glass, with areas of sharp clarity juxtaposed against dreamy soft-focus zones. The technique creates depth and layering—faces or objects emerge from abstracted backgrounds, with motion blur suggesting speed or emotional states. Overlapping translucent panels with varying blur intensities create a sense of dimensional space, like looking through multiple panes of textured glass. Color bleeds and gradient transitions occur naturally where blurred elements meet sharp edges, producing ethereal, atmospheric compositions that feel cinematic and emotionally evocative.",
        "accentColor": "#607d8b"
    }
];

// DOM elements
const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsGrid = document.getElementById('resultsGrid');
const toast = document.getElementById('toast');

// Event listeners
generateBtn.addEventListener('click', generatePrompts);
promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        generatePrompts();
    }
});

// Generate prompts function
function generatePrompts() {
    const userPrompt = promptInput.value.trim();
    
    if (!userPrompt) {
        promptInput.focus();
        return;
    }

    // Show loading state
    generateBtn.classList.add('generate-btn--loading');
    generateBtn.disabled = true;

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
        createStyleCards(userPrompt);
        showResults();
        
        // Reset button state
        generateBtn.classList.remove('generate-btn--loading');
        generateBtn.disabled = false;
    }, 500);
}

// Create style cards
function createStyleCards(userPrompt) {
    resultsGrid.innerHTML = '';
    
    designStyles.forEach((style, index) => {
        const combinedPrompt = `${userPrompt} in the style of ${style.description}`;
        const styleClass = style.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
        
        const card = document.createElement('div');
        card.className = `style-card style-card--${styleClass}`;
        card.innerHTML = `
            <div class="style-card__header">
                <h3 class="style-card__title">${style.name}</h3>
            </div>
            <div class="style-card__prompt">${combinedPrompt}</div>
            <button class="copy-btn" onclick="copyPrompt(this, '${escapeHtml(combinedPrompt)}')">
                <svg class="copy-icon" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
                Copy Prompt
            </button>
        `;
        
        resultsGrid.appendChild(card);
        
        // Add staggered animation
        setTimeout(() => {
            card.classList.add('show');
        }, index * 100);
    });
}

// Show results section
function showResults() {
    resultsSection.classList.remove('hidden');
    setTimeout(() => {
        resultsSection.classList.add('show');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Copy prompt to clipboard
function copyPrompt(button, prompt) {
    navigator.clipboard.writeText(prompt).then(() => {
        // Update button state
        const originalText = button.innerHTML;
        button.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            Copied!
        `;
        button.classList.add('copy-btn--copied');
        
        // Show toast notification
        showToast();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copy-btn--copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        fallbackCopy(prompt, button);
    });
}

// Fallback copy method for older browsers
function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast();
        
        const originalText = button.innerHTML;
        button.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            Copied!
        `;
        button.classList.add('copy-btn--copied');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copy-btn--copied');
        }, 2000);
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show toast notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Escape HTML for security
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Focus on input when page loads
document.addEventListener('DOMContentLoaded', () => {
    promptInput.focus();
});