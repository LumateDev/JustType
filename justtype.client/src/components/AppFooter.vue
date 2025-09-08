<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">AppName</h3>
        <p class="footer-description">
          Your learning platform for mastering new skills and tracking progress.
        </p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Navigation</h4>
        <div class="footer-links">
          <router-link to="/home" class="footer-link">Home</router-link>
          <router-link to="/lessons" class="footer-link">Lessons</router-link>
          <router-link to="/leaderboard" class="footer-link">Leaderboard</router-link>
          <router-link to="/about" class="footer-link">About</router-link>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Support</h4>
        <div class="footer-links">
          <a href="#" class="footer-link">Help Center</a>
          <a href="#" class="footer-link">Contact Us</a>
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Connect</h4>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="GitHub">
            <MdiIcon :path="mdiGithub" :size="20" />
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <MdiIcon :path="mdiTwitter" :size="20" />
          </a>
          <a href="#" class="social-link" aria-label="LinkedIn">
            <MdiIcon :path="mdiLinkedin" :size="20" />
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 AppName. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import MdiIcon from "@/components/MdiIcon.vue";
import { mdiGithub, mdiTwitter, mdiLinkedin } from "@mdi/js";
</script>

<style scoped lang="scss">
.app-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.footer-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.footer-description {
  color: var(--color-textMuted);
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: var(--color-textMuted);
  text-decoration: none;
  transition: var(--transition-fast);

  &:hover {
    color: var(--color-primary);
  }
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-textMuted);
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: 24px;
  text-align: center;

  p {
    color: var(--color-textMuted);
    margin: 0;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 16px;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
