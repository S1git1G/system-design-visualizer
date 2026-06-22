from app.config.settings import Settings


def test_cors_origins_splitting():
    """Verify that settings correctly strip and split CORS origins comma-separated string."""
    test_settings = Settings(cors_origins="http://localhost:3000, http://example.com ")
    origins = test_settings.get_cors_origins()
    assert origins == ["http://localhost:3000", "http://example.com"]


def test_default_settings():
    """Verify the default Settings config options are populated correctly."""
    test_settings = Settings()
    # Check that basic defaults exist
    assert test_settings.backend_host == "0.0.0.0"
    assert test_settings.backend_port == 8000
    assert test_settings.max_requests_per_minute == 20
