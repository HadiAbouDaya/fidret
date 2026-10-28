"""A synthetic-only freshness model; no hardware or network interfaces."""

from .model import FreshnessModel, LatestReadingBaseline, Reading, Snapshot

__all__ = ["FreshnessModel", "LatestReadingBaseline", "Reading", "Snapshot"]
